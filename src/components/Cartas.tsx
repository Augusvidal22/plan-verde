"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Plan } from "@/types/plan";
import FotoPlan from "./FotoPlan";

interface CartasProps {
  planes: Plan[];
  onVerSorpresa: () => void;
  onVolver: () => void;
}

type Fase = "barajando" | "eligiendo" | "revelado";

function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const AMBIENTE_INFO = {
  "aire libre": { emoji: "🌳", label: "Aire libre" },
  "bajo techo": { emoji: "🏠", label: "Bajo techo" },
};

const MOMENTO_INFO = {
  dia: { emoji: "☀️", label: "De día" },
  noche: { emoji: "🌙", label: "De noche" },
  cualquiera: { emoji: "🕐", label: "Día o noche" },
};

const corazones = [
  { left: "6%", top: "10%", size: "text-2xl", delay: 0, duracion: 4.2, emoji: "💚" },
  { left: "88%", top: "14%", size: "text-3xl", delay: 0.6, duracion: 3.6, emoji: "🖤" },
  { left: "12%", top: "78%", size: "text-2xl", delay: 1.1, duracion: 4.8, emoji: "🖤" },
  { left: "92%", top: "72%", size: "text-3xl", delay: 0.3, duracion: 4, emoji: "💚" },
  { left: "50%", top: "6%", size: "text-xl", delay: 0.9, duracion: 3.9, emoji: "💚" },
  { left: "22%", top: "40%", size: "text-lg", delay: 1.6, duracion: 4.5, emoji: "🖤" },
  { left: "78%", top: "42%", size: "text-lg", delay: 0.4, duracion: 4.1, emoji: "💚" },
];

function CorazonesFlotantes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {corazones.map((c, i) => (
        <motion.span
          key={i}
          className={`absolute ${c.size}`}
          style={{ left: c.left, top: c.top }}
          animate={{ y: [0, -16, 0], opacity: [0.35, 0.9, 0.35] }}
          transition={{
            duration: c.duracion,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay,
          }}
        >
          {c.emoji}
        </motion.span>
      ))}
    </div>
  );
}

function lanzarConfetti() {
  const colores = ["#A8D5BA", "#7FBF9B", "#1C1C1C", "#FFFDF8"];
  confetti({
    particleCount: 100,
    spread: 75,
    origin: { y: 0.6 },
    colors: colores,
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.5 },
      colors: colores,
    });
  }, 200);
}

export default function Cartas({ planes, onVerSorpresa, onVolver }: CartasProps) {
  const [fase, setFase] = useState<Fase>("barajando");
  const [mazo, setMazo] = useState<Plan[]>(() => mezclar(planes).slice(0, 8));
  const [elegidaId, setElegidaId] = useState<string | null>(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setFase("eligiendo"), 1300);
    return () => clearTimeout(t);
  }, [mazo]);

  useEffect(() => {
    if (fase === "revelado") lanzarConfetti();
  }, [fase]);

  const elegida = useMemo(
    () => mazo.find((p) => p.id === elegidaId) ?? null,
    [mazo, elegidaId]
  );

  function handleElegir(plan: Plan) {
    if (fase !== "eligiendo") return;
    setElegidaId(plan.id);
    setFase("revelado");
  }

  function handleTirarDeNuevo() {
    setElegidaId(null);
    setFase("barajando");
    setMazo(mezclar(planes).slice(0, 8));
  }

  const cartasVisibles = fase === "eligiendo" || fase === "barajando"
    ? mazo
    : mazo.filter((p) => p.id === elegidaId);

  return (
    <div className="relative flex min-h-dvh flex-col items-center bg-crema px-4 py-10 md:px-8">
      {fase === "eligiendo" && <CorazonesFlotantes />}

      {fase !== "revelado" &&
        montado &&
        createPortal(
          <button
            onClick={onVolver}
            className="fixed right-4 top-4 z-20 font-sans text-sm font-semibold text-negro/50 transition-colors hover:text-negro md:right-6 md:top-6"
          >
            ← volver
          </button>,
          document.body
        )}

      <div className="my-auto flex w-full flex-col items-center">
        {fase !== "revelado" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 mb-8 flex flex-col items-center gap-2 text-center"
          >
            <h2 className="font-poppins text-xl font-semibold text-negro md:text-2xl">
              {fase === "barajando" ? "Barajando los planes... 🌿" : "Elegí una carta, sofff 💚"}
            </h2>
            {fase === "eligiendo" && (
              <p className="font-manuscrita text-xl text-negro/60 md:text-2xl">
                tocá la que más te guste 🖤
              </p>
            )}
          </motion.div>
        )}

        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-5 md:gap-8">
        <AnimatePresence>
          {cartasVisibles.map((p) => {
            const esElegida = p.id === elegidaId;
            const revelada = esElegida && fase === "revelado";

            return (
              <motion.div
                key={p.id}
                layout
                initial={
                  fase === "barajando"
                    ? { opacity: 0, y: 40, rotate: 0 }
                    : { opacity: 0, scale: 0.85 }
                }
                animate={
                  fase === "barajando"
                    ? {
                        opacity: 1,
                        y: 0,
                        x: [0, -16, 16, -8, 8, 0],
                        rotate: [0, -6, 6, -3, 3, 0],
                        transition: { duration: 1.1, ease: "easeInOut" },
                      }
                    : { opacity: 1, scale: 1 }
                }
                exit={{ opacity: 0, scale: 0.6, y: 20, transition: { duration: 0.35 } }}
                transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
                onClick={() => handleElegir(p)}
                className={
                  revelada
                    ? "h-[32rem] w-full max-w-sm cursor-default md:h-[36rem]"
                    : "h-48 w-32 cursor-pointer md:h-64 md:w-44"
                }
              >
                <div className="perspective-1000 h-full w-full">
                  <motion.div
                    className="preserve-3d relative h-full w-full"
                    animate={{ rotateY: revelada ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Dorso de la carta */}
                    <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-verde-pastel-dark bg-gradient-to-br from-verde-pastel to-verde-pastel-dark shadow-carta">
                      <span className="absolute right-3 top-3 text-lg opacity-70">🖤</span>
                      <span className="text-4xl md:text-5xl">🌿</span>
                      <span className="font-manuscrita text-xl text-negro/70 md:text-2xl">
                        Plan Verde
                      </span>
                      <span className="absolute bottom-3 left-3 text-lg opacity-70">💚</span>
                    </div>

                    {/* Frente de la carta (detalle del plan) */}
                    <div
                      className="backface-hidden absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-carta"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      {revelada && (
                        <div className="flex h-full flex-col">
                          <FotoPlan
                            src={p.foto}
                            alt={p.nombre}
                            emojiFallback={p.emojiFallback}
                            className="h-40 w-full md:h-56"
                          />
                          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5 md:p-6">
                            <h3 className="font-poppins text-xl font-bold text-negro md:text-2xl">
                              {p.nombre}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                              <span className="whitespace-nowrap rounded-full bg-verde-pastel-light px-3 py-1 text-xs font-semibold text-verde-pastel-dark md:text-sm">
                                {AMBIENTE_INFO[p.ambiente].emoji} {AMBIENTE_INFO[p.ambiente].label}
                              </span>
                              <span className="whitespace-nowrap rounded-full bg-verde-pastel-light px-3 py-1 text-xs font-semibold text-verde-pastel-dark md:text-sm">
                                {MOMENTO_INFO[p.momento].emoji} {MOMENTO_INFO[p.momento].label}
                              </span>
                              {p.duracion === "finde" && (
                                <span className="whitespace-nowrap rounded-full bg-negro px-3 py-1 text-xs font-semibold text-crema md:text-sm">
                                  🏕️ plan de finde
                                </span>
                              )}
                            </div>

                            <p className="font-manuscrita text-xl text-negro/80 md:text-2xl">
                              {p.frase}
                            </p>

                            <p className="font-sans text-sm text-negro/70 md:text-base">
                              📍{" "}
                              {p.direccionOMapa.startsWith("http") ? (
                                <a
                                  href={p.direccionOMapa}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-verde-pastel-dark underline-offset-2 hover:text-verde-pastel-dark"
                                >
                                  ver en el mapa
                                </a>
                              ) : (
                                p.direccionOMapa
                              )}
                            </p>

                            <div>
                              <p className="mb-1 font-sans text-sm font-semibold text-negro/80">
                                Qué llevar:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {p.requisitos.map((r) => (
                                  <span
                                    key={r}
                                    className="rounded-full bg-crema px-3 py-1 text-xs text-negro/70 ring-1 ring-negro/10 md:text-sm"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {fase === "revelado" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <motion.button
            onClick={handleTirarDeNuevo}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-negro px-6 py-3 font-sans font-semibold text-negro transition-colors hover:bg-negro hover:text-crema"
          >
            🔄 Tirar de nuevo
          </motion.button>
          <motion.button
            onClick={onVerSorpresa}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-negro px-6 py-3 font-sans font-semibold text-crema shadow-carta transition-colors hover:bg-verde-pastel-dark hover:text-negro"
          >
            💌 Carta sorpresa
          </motion.button>
        </motion.div>
      )}
      </div>
    </div>
  );
}



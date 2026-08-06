"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RespuestasQuiz } from "@/types/plan";

interface QuizProps {
  onCompletar: (respuestas: RespuestasQuiz) => void;
}

const frasesTiernas = [
  "Cualquier plan es lindo si es con vos, sofff 💚",
  "No hay respuesta incorrecta acá 🌿",
  "Ya me estoy imaginando tu risa en cualquiera de estos planes",
  "Elijas lo que elijas, ya gané yo",
  "Con vos hasta quedarme en casa es un planazo",
  "Desde el 3 de julio no paro de pensar en vos",
  "Ojalá el plan tenga humus, pero con vos cualquiera está bien",
  "Un poquito de negro, un poquito de verde, un mucho de vos 🖤🌿",
  "Dato random: los perritos felices menean la cola. Yo no tengo cola, pero la idea es esa 🐶",
  "Si algún día tenemos un perro, ya sé que lo vas a malcriar más que yo",
  "Estoy más nervioso eligiendo bien las opciones que vos eligiendo la respuesta",
  "Sea cual sea el plan, ya estoy pensando en la próxima vez",
  "Todavía nos estamos conociendo, pero ya sé que me gusta esto",
  "Un perrito feliz corriendo en un parque es más o menos lo que siento eligiendo esto con vos 🐾",
  "No hay presión, sofff. Peor es nada, y esto ya es bastante lindo",
  "Prometo no hacer trampa con las cartas (esta vez)",
];

type OpcionMomento = {
  value: "dia" | "noche" | "sorprender";
  label: string;
  emoji: string;
};
type OpcionAmbiente = { value: "aire libre" | "bajo techo"; label: string; emoji: string };

const preguntaMomento = {
  texto: "¿De día, de noche, o te sorprendo?",
  opciones: [
    { value: "dia", label: "De día", emoji: "☀️" },
    { value: "noche", label: "De noche", emoji: "🌙" },
    { value: "sorprender", label: "Sorprendeme", emoji: "🎲" },
  ] as OpcionMomento[],
};

const preguntaAmbiente = {
  texto: "¿Aire libre o bajo techo?",
  opciones: [
    { value: "aire libre", label: "Aire libre", emoji: "🌳" },
    { value: "bajo techo", label: "Bajo techo", emoji: "🏠" },
  ] as OpcionAmbiente[],
};

export default function Quiz({ onCompletar }: QuizProps) {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestasQuiz>({
    momento: null,
    ambiente: null,
  });
  const [fraseIndex, setFraseIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseIndex((i) => (i + 1) % frasesTiernas.length);
    }, 3200);
    return () => clearInterval(intervalo);
  }, []);

  function elegirMomento(valor: "dia" | "noche" | "sorprender") {
    const nuevas = { ...respuestas, momento: valor };
    setRespuestas(nuevas);
    setPaso(1);
  }

  function elegirAmbiente(valor: "aire libre" | "bajo techo") {
    const nuevas = { ...respuestas, ambiente: valor };
    setRespuestas(nuevas);
    onCompletar(nuevas);
  }

  const pregunta = paso === 0 ? preguntaMomento : preguntaAmbiente;

  return (
    <div className="flex min-h-dvh flex-col items-center bg-crema px-6 py-8">
      <div className="mb-6 flex gap-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`h-2 w-8 rounded-full transition-colors ${
              i === paso ? "bg-verde-pastel-dark" : i < paso ? "bg-verde-pastel" : "bg-negro/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          className="flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center"
        >
          <h2 className="mb-10 font-poppins text-2xl font-semibold text-negro md:text-3xl">
            {pregunta.texto}
          </h2>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            {paso === 0
              ? preguntaMomento.opciones.map((op) => (
                  <motion.button
                    key={op.value}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => elegirMomento(op.value)}
                    className="flex flex-1 flex-col items-center gap-2 rounded-3xl border-2 border-verde-pastel bg-white px-6 py-8 shadow-carta transition-colors hover:bg-verde-pastel-light"
                  >
                    <span className="text-4xl">{op.emoji}</span>
                    <span className="font-sans text-lg font-semibold text-negro">
                      {op.label}
                    </span>
                  </motion.button>
                ))
              : preguntaAmbiente.opciones.map((op) => (
                  <motion.button
                    key={op.value}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => elegirAmbiente(op.value)}
                    className="flex flex-1 flex-col items-center gap-2 rounded-3xl border-2 border-verde-pastel bg-white px-6 py-8 shadow-carta transition-colors hover:bg-verde-pastel-light"
                  >
                    <span className="text-4xl">{op.emoji}</span>
                    <span className="font-sans text-lg font-semibold text-negro">
                      {op.label}
                    </span>
                  </motion.button>
                ))}
          </div>

          {paso === 1 && (
            <button
              onClick={() => setPaso(0)}
              className="mt-8 font-sans text-sm text-negro/50 underline underline-offset-2 hover:text-negro"
            >
              ← volver
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex w-full justify-center px-6 pb-2 pt-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={fraseIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm text-center font-manuscrita text-xl text-negro/70 md:text-2xl"
          >
            {frasesTiernas[fraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

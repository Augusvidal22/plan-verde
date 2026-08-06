"use client";

import { useMemo, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bienvenida from "@/components/Bienvenida";
import Quiz from "@/components/Quiz";
import Cartas from "@/components/Cartas";
import CartaSorpresa from "@/components/CartaSorpresa";
import { planes } from "@/data/planes";
import { RespuestasQuiz } from "@/types/plan";

type Pantalla = "bienvenida" | "quiz" | "cartas" | "sorpresa";

interface EstadoApp {
  pantalla: Pantalla;
  respuestas: RespuestasQuiz;
}

type Accion =
  | { type: "COMENZAR" }
  | { type: "COMPLETAR_QUIZ"; respuestas: RespuestasQuiz }
  | { type: "VER_SORPRESA" }
  | { type: "VOLVER_A_CARTAS" }
  | { type: "VOLVER_AL_QUIZ" };

const estadoInicial: EstadoApp = {
  pantalla: "bienvenida",
  respuestas: { momento: null, ambiente: null },
};

function reducer(estado: EstadoApp, accion: Accion): EstadoApp {
  switch (accion.type) {
    case "COMENZAR":
      return { ...estado, pantalla: "quiz" };
    case "COMPLETAR_QUIZ":
      return { ...estado, pantalla: "cartas", respuestas: accion.respuestas };
    case "VER_SORPRESA":
      return { ...estado, pantalla: "sorpresa" };
    case "VOLVER_A_CARTAS":
      return { ...estado, pantalla: "cartas" };
    case "VOLVER_AL_QUIZ":
      return { ...estado, pantalla: "quiz" };
    default:
      return estado;
  }
}

export default function Home() {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);

  const planesFiltrados = useMemo(() => {
    const { momento, ambiente } = estado.respuestas;
    if (!momento || !ambiente) return planes;
    const filtrados = planes.filter((p) => {
      const matchMomento =
        momento === "sorprender" || p.momento === "cualquiera" || p.momento === momento;
      return matchMomento && p.ambiente === ambiente;
    });
    // Si el filtro no matchea ningún plan, mostramos todos para que la
    // experiencia nunca se quede sin cartas para barajar.
    return filtrados.length > 0 ? filtrados : planes;
  }, [estado.respuestas]);

  return (
    <AnimatePresence mode="wait">
      {estado.pantalla === "bienvenida" && (
        <motion.div
          key="bienvenida"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Bienvenida onComenzar={() => dispatch({ type: "COMENZAR" })} />
        </motion.div>
      )}

      {estado.pantalla === "quiz" && (
        <motion.div key="quiz" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <Quiz
            onCompletar={(respuestas) =>
              dispatch({ type: "COMPLETAR_QUIZ", respuestas })
            }
          />
        </motion.div>
      )}

      {estado.pantalla === "cartas" && (
        <motion.div key="cartas" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <Cartas
            planes={planesFiltrados}
            onVerSorpresa={() => dispatch({ type: "VER_SORPRESA" })}
            onVolver={() => dispatch({ type: "VOLVER_AL_QUIZ" })}
          />
        </motion.div>
      )}

      {estado.pantalla === "sorpresa" && (
        <motion.div key="sorpresa" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <CartaSorpresa onVolver={() => dispatch({ type: "VOLVER_A_CARTAS" })} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

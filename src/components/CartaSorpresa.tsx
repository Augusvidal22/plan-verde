"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FotoPlan from "./FotoPlan";

interface CartaSorpresaProps {
  onVolver: () => void;
}

const fotosSorpresa = [
  "/images/ascensor.jpeg",
  "/images/carlos-keen.jpeg",
  "/images/comida-noche.jpeg",
  "/images/pastafrola.jpeg",
  "/images/perro-1.jpg",
  "/images/perro-2.jpg",
  "/images/perro-3.jpg",
  "/images/perro-4.jpg",
  "/images/perro-5.jpg",
  "/images/perro-6.jpg",
];

const mensajesSorpresa = [
  "Desde el 3 de julio, cuando Argentina le ganaba a Cabo Verde, algo empezó entre nosotros. Todavía nos estamos conociendo — y no hay apuro. Elijas el plan que elijas, quiero seguir sumando días como este con vos.",
  "Si el plan tiene humus con limón, ya sé que vas a estar feliz. Y si no lo tiene, prometo conseguirte uno igual.",
  "Negro y verde. Dos colores que ahora me gustan más porque son los tuyos, sofff.",
  "No hace falta ponerle nombre a esto para que sea lindo. Con vos, cualquier tarde se siente especial.",
  "Un dato: si hay dulce de membrillo cerca, yo ya estoy pensando en vos.",
  "Todavía se me escapa la risa cuando pienso en cómo empezamos, con Argentina metiendo goles de fondo.",
  "No sé qué plan te va a tocar, pero sí sé que quiero estar ahí para verlo con vos.",
  "Gracias por darle una oportunidad a esto que recién empieza. Vamos despacio, pero vamos.",
  "Entre tantas audiencias y códigos, ojalá este ratito con vos sea la mejor parte de tu semana.",
  "Pastelitos de batata, humus, dulce de membrillo... y vos. Mi lista de cosas favoritas va quedando bastante clara.",
  "Me hice vegetariano por vos, y no me arrepiento ni un poco — ahora hasta discuto con vos cuál humus es mejor.",
  "Quiero ir sumando países al mapa, no solo planes a la lista.",
  "Cada comida nueva que probamos juntos ya es un recuerdo, salga rica o no.",
  "No hace falta un viaje grande para sentir que estamos conociendo el mundo juntos — a veces alcanza con una tarde distinta.",
  "Tengo ganas de un viaje largo con vos, de esos que se planean con el mapa abierto y sin apuro.",
  "Cambié de dieta, no de rumbo: sigo yendo derecho hacia más momentos como este con vos.",
  "Me gusta la idea de ir coleccionando lugares nuevos, comidas raras y fotos torpes con vos.",
  "La vida se siente más liviana cuando la pienso en versión 'con vos', sea un viaje, una cena nueva o un martes cualquiera.",
];

export default function CartaSorpresa({ onVolver }: CartaSorpresaProps) {
  const [foto] = useState(
    () => fotosSorpresa[Math.floor(Math.random() * fotosSorpresa.length)]
  );
  const [mensaje] = useState(
    () => mensajesSorpresa[Math.floor(Math.random() * mensajesSorpresa.length)]
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-crema to-verde-pastel-light px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-carta"
      >
        <FotoPlan
          src={foto}
          alt="Foto sorpresa"
          emojiFallback="🖤"
          className="h-64 w-full md:h-80"
        />
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <span className="text-3xl">💌</span>
          <p className="font-manuscrita text-2xl leading-relaxed text-negro/85 md:text-3xl">
            {mensaje}
          </p>
          <span className="mt-1 font-manuscrita text-xl text-negro/60 md:text-2xl">
            con cariño, Augusto 🌿
          </span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onVolver}
        className="mt-8 rounded-full border-2 border-negro px-6 py-3 font-sans font-semibold text-negro transition-colors hover:bg-negro hover:text-crema"
      >
        ← volver a las cartas
      </motion.button>
    </div>
  );
}

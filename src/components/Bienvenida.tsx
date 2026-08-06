"use client";

import { motion } from "framer-motion";

interface BienvenidaProps {
  onComenzar: () => void;
}

export default function Bienvenida({ onComenzar }: BienvenidaProps) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-verde-pastel-light via-crema to-crema px-6 text-center">
      {/* Blobs decorativos */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full bg-verde-pastel/40 blur-3xl md:h-80 md:w-80"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-verde-pastel-dark/30 blur-3xl md:h-96 md:w-96"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 text-5xl md:text-6xl"
      >
        🌿
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-poppins text-3xl font-semibold text-negro md:text-5xl"
      >
        Hola, Sofía
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-4 max-w-md font-manuscrita text-2xl text-negro/80 md:text-3xl"
      >
        Te tengo unas cartitas con planes para nosotros. ¿Elegimos una?
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={onComenzar}
        className="mt-10 rounded-full bg-negro px-8 py-4 font-sans text-lg font-semibold text-crema shadow-carta transition-colors hover:bg-verde-pastel-dark hover:text-negro md:px-10 md:py-5 md:text-xl"
      >
        Empezar ✨
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 font-sans text-xs text-negro/40 md:text-sm"
      >
        hecho con cariño por Augusto 🖤
      </motion.p>
    </div>
  );
}

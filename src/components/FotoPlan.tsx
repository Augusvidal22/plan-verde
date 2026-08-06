"use client";

import { useState } from "react";
import Image from "next/image";

interface FotoPlanProps {
  src: string;
  alt: string;
  emojiFallback: string;
  className?: string;
}

export default function FotoPlan({ src, alt, emojiFallback, className = "" }: FotoPlanProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-verde-pastel to-verde-pastel-dark ${className}`}
      >
        <span className="text-5xl md:text-6xl">{emojiFallback}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

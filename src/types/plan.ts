export type Categoria = "aire libre" | "cultura" | "comida" | "cine" | "interior";

export type Momento = "dia" | "noche" | "cualquiera";

export interface Plan {
  id: string;
  nombre: string;
  categoria: Categoria;
  momento: Momento;
  ambiente: "aire libre" | "bajo techo";
  vegetarianoFriendly: boolean;
  foto: string;
  emojiFallback: string;
  frase: string;
  direccionOMapa: string;
  requisitos: string[];
  /** Solo para planes que no son de ida y vuelta en el día (ej: escapadas de finde). */
  duracion?: "dia" | "finde";
}

export interface RespuestasQuiz {
  momento: "dia" | "noche" | "sorprender" | null;
  ambiente: "aire libre" | "bajo techo" | "sorprender" | null;
}

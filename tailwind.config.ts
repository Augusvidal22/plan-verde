import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "verde-pastel": {
          DEFAULT: "#A8D5BA",
          light: "#C9E7D6",
          dark: "#7FBF9B",
        },
        crema: "#FFFDF8",
        negro: "#1C1C1C",
      },
      fontFamily: {
        sans: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        manuscrita: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        carta: "0 10px 30px -10px rgba(28, 28, 28, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;

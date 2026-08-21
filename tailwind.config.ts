import type { Config } from "tailwindcss";

/* TRAME · OUTREMER — base ivoire, texte noir, cobalt en accent.
   Les anciens tokens sont conserves mais remappes : le site entier
   bascule sans modifier les composants. */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0", sm: "0", DEFAULT: "0", md: "0", lg: "0",
      xl: "0", "2xl": "0", "3xl": "0", full: "0",
    },
    extend: {
      fontFamily: {
        leaguespartan: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"],
        display: ['"Archivo Black"', "Impact", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        text: "#14110E",
        background: "#E9DFC6",
        primary: "#F2EAD6",
        middle: "#EDE3CC",
        secondary: "#E0D4B6",
        accent: "#1834C6",
        cobalt: "#1834C6",
        ivory: "#E9DFC6",
        noir: "#14110E",
        gold: "#EDBB00",
        garnet: "#A50044",
        mut: "#6E6650",
      },
      borderWidth: { 1: "1px", 3: "3px" },
      boxShadow: {
        shift: "4px 4px 0 #1834C6",
        "shift-noir": "4px 4px 0 #14110E",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-20deg)" },
          "75%": { transform: "rotate(20deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: { wave: "wave 0.8s linear" },
    },
  },
  plugins: [],
};
export default config;

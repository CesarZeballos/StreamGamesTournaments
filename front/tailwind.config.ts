import { Raleway, Roboto } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
        lighting: "#E35AFF",
        lightViolet: "#CE00F1",
        softViolet: "#C15AEC",
        BGdark: "#301048",
        BGlight: "#28004b",
        BGdarkness: "#261039",
        white: "#ffffff",
        greenAlert: "#2AEB1D",
      },

      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"]
      },
      
      maxHeight: {
        '500px': '500px',
      },

      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
      },

      spacing: {
        'small': '1rem',
        'medium': '3.5rem',
        'large': '7.5rem',
      },
    },
  },
  plugins: [],
};
export default config;

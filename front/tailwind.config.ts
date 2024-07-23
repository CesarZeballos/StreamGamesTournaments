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
        lightViolet: "#E35AFF",
        softViolet: "#C15AEC",
        BGdark: "#301048",
        BGlight: "#49176B",
        white: "#ffffff",
        greenAlert: "#2AEB1D"
      },

      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"]
      },

      spacing: {
        'small': '1rem',
        'medium': '3.5rem',
        'large': '7.5rem'
      },
    },
  },
  plugins: [],
};
export default config;

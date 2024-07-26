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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightViolet: "#E35AFF",
        softViolet: "#C15AEC",
        BGdark: "#301048",
        BGlight: "#49176B",
        white: "#ffffff",
        greenAlert: "#2AEB1D"
      },

      maxHeight: {
        '500px': '500px',
      },

      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"]
      },

      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
      }
    },
  },
  plugins: [],
};
export default config;

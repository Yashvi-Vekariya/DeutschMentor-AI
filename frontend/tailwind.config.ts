import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ember: "#ffcf54",
        signal: "#ef4444",
        ink: "#07090d",
        graphite: "#151821",
        mint: "#4ade80"
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 207, 84, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;


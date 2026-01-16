import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dyslexic: ["OpenDyslexic", "sans-serif"],
      },
      colors: {
        cream: "#FDFBF7",
        "dark-blue": "#1E3A5F",
      },
    },
  },
  plugins: [],
};
export default config;

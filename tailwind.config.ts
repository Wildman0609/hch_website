import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        holly: {
          leaf: "#628f54",
          leafLight: "#81bc81",
          moss: "#3f6f4d",
          ink: "#17252a",
          teal: "#46707f",
          sky: "#f5fafd",
          cream: "#fbf7ee",
          gold: "#c9882d",
          rust: "#9b5a24"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 37, 42, 0.10)",
        lift: "0 14px 30px rgba(23, 37, 42, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;

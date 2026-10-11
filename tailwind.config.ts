import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ink: {
          DEFAULT: "#0B1220",
          soft: "#334155",
          muted: "#64748B",
        },
        paper: {
          DEFAULT: "#FAFAF7",
          card: "#FFFFFF",
          line: "#E7E5DF",
        },
        brand: {
          DEFAULT: "#4338CA",
          soft: "#EEF2FF",
          dark: "#312E81",
        },
        site: {
          DEFAULT: "#F59E0B",
          dark: "#B45309",
          soft: "#FEF3C7",
          char: "#1C1917",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.12)",
        lift: "0 2px 4px rgba(15, 23, 42, 0.06), 0 24px 48px -20px rgba(15, 23, 42, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "flow-dot": {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "flow-dot": "flow-dot 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ink: {
          DEFAULT: "#0F0F0F",
          soft: "#3D3D3D",
          muted: "#6E6E6E",
        },
        paper: {
          DEFAULT: "#F4F4F0",
          card: "#FFFFFF",
          line: "#DCDCD5",
        },
        brand: {
          DEFAULT: "#1F45FF",
          soft: "#E4E9FF",
          dark: "#1131CC",
        },
        sand: "#E8D8C3",
        night: {
          DEFAULT: "#0D0C0F",
          800: "#141317",
          700: "#1B1A1F",
          600: "#26242B",
        },
        volt: "#A996E8",
        flare: "#E9A8A0",
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
        "hard-sm": "2px 2px 0 0 #0F0F0F",
        hard: "4px 4px 0 0 #0F0F0F",
        "hard-lg": "8px 8px 0 0 #0F0F0F",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
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
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-rev": "marquee 40s linear infinite reverse",
        "spin-slow": "spin 18s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s ease-out infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        "flow-dot": "flow-dot 2.4s linear infinite",
      },
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
};

export default config;

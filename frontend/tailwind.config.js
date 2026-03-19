/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink:   "#0d0d0f",
        paper: "#f5f3ee",
        slate: {
          850: "#18181f",
          900: "#111114",
          950: "#09090c",
        },
        acid: {
          DEFAULT: "#b8f53d",
          dim:     "#8fc42d",
        },
        cobalt: {
          DEFAULT: "#3d8ef5",
          dim:     "#2d6cc4",
        },
        fog: "#9694a0",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "slide-left": "slideLeft 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideLeft: {
          "0%":   { opacity: 0, transform: "translateX(32px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

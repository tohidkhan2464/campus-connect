/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mullish: ["Mulish", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        red: "#F2226E",
        lightRed: "#D92B7C",
        purple: "#8758A6",
        blue: "#29A5F2",
        grayWhite: "#F2F2F2",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      screens: {
        mobileS: { max: "320px" },
        mobileM: { min: "320px", max: "375px" },
        mobileX: { min: "340px", max: "400px" },
        mobileL: { min: "375px", max: "425px" },
        tablet: { min: "425px", max: "768px" },
        tabletX: { min: "570px", max: "890px" },
        laptop: { min: "767px", max: "1024px" },
        laptopX: { min: "890px", max: "1230px" },
        laptopL: { min: "1024px", max: "1440px" },
        display4K: { min: "1440px" },
      },
      extend: {
        maxWidth: {
          maxContent: "1260px",
          maxContentTab: "650px",
        },
      },
    },
  },
  plugins: [],
};

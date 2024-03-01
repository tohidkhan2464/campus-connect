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
        deepBlue: "#02042a",
        lightBlue: "#2b84ea",
        lightBlue300: "#4b94ed",
        lightBlue500: "#0b72e7",
        greenLight: "#61cea6",
        grayText: "#818597",
        lightGray: "#e2e2e2",
        grayBlue: "#344a6c",
        deepBlueHead: "#162f56",
        gray2: "#525a76",
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          100: "#AFB2BF",
          200: "#999DAA",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        blue: {
          100: "#47A5C5",
        },
        pink: {
          200: "#EF476F",
        },
        yellow: {
          50: "#FFD60A",
        },
      },
    },
  },
  plugins: [],
};

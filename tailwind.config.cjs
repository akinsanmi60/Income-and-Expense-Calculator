/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1980px",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1028px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "834px" },
      // => @media (max-width: 767px) { ... }

      xlsm: { max: "550px" },
      // => @media (max-width: 550px) { ... }

      sm: { max: "375px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};

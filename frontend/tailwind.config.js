/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        researcher: "Researcher",
        outfit: ["Outfit", "sans-serif"],
        aquire: "Aquire",
      },
      backgroundColor: {
        dark: "#010101",
        lightDark: "#2b2b37",
      },
      textColor: {
        dark: "#737373",
      },
      height: {
        47: "47px",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#009FDE",
        "light-primary": "#A4DDF7",
      },
      fontFamily: {
        noto: ["'Noto Serif'", "serif"],
      },
    },
  },
  plugins: [],
};


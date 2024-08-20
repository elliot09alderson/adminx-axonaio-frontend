/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      //       $main-bg: #2a3447;
      // $soft-bg: #384256;
      // $dark-bg: #222b3c;
      // //TEXT
      // $main-color: white;
      // $soft-color: #ddd;
      // $dark-color: #2a3447;
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        "extra-night": "#141e30",
        night: "#243b55",
        day: "#9fd3c7",
        "day-light": "#ececec",
        "extra-day": "#0083b0",
        "slate-850": "#161E2E",
      },
      backgroundImage: {
        "gradient-day": "linear-gradient(to right, #000c40, #f0f2f0)",
        "gradient-night": " linear-gradient(to right, #000000, #434343)",
        "dashboard-day": "#ececec ",
        "dashboard-night": "#272343",
      },
    },
  },
  plugins: [flowbite.plugin()],
  darkMode: "class",
};

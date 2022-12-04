const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "type-normal": "#d9d6c5",
        "type-grass": "#b8e064",
        "type-fire": "#f27761",
        "type-water": "#a4c9ff",
        "type-fighting": "#cb7b5b",
        "type-flying": "#bbccff",
        "type-poison": "#b97eb1",
        "type-ground": "#f6da72",
        "type-rock": "#e2cd90",
        "type-bug": "#f3ff0b",
        "type-ghost": "#a69fdd",
        "type-electric": "#fbeb5a",
        "type-psychic": "#ee8ec6",
        "type-ice": "#e1f8fe",
        "type-dragon": "#b5a4ff",
        "type-dark": "#ab855c",
        "type-steel": "#e1dce1",
        "type-fairy": "#f9d7fb",
      },
    },
  },

  safelist: [{ pattern: /bg-type-.*/ }],

  plugins: [],
};

module.exports = config;

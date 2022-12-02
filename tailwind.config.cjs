const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "type-normal": colors.neutral,
        "type-fire": colors.red,
        "type-water": colors.blue,
        "type-electric": colors.yellow,
        "type-grass": colors.emerald,
        "type-ice": colors.cyan,
        "type-psychic": colors.fuchsia,
        "type-fighting": colors.orange,
        "type-poison": colors.violet,
        "type-ground": colors.amber,
        "type-flying": colors.sky,
        "type-bug": colors.lime,
        "type-rock": colors.slate,
        "type-ghost": colors.purple,
        "type-dragon": colors.indigo,
        "type-dark": colors.stone,
        "type-steel": colors.gray,
        "type-fairy": colors.pink,
      },
    },
  },

  safelist: [{ pattern: /bg-type-.*/ }],

  plugins: [],
};

module.exports = config;

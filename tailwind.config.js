const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      teal: colors.teal,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      'warn-gray':colors.warmGray,
      'true-gray':colors.trueGray,
      gray: colors.gray,
      'cool-gray':colors.coolGray,
      'blue-gray':colors.blueGray,
    },
    extend: {
      fontFamily: {
        Roboto: ['Roboto']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

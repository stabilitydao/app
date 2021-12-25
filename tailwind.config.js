const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      space: '#18042c',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      teal: colors.teal,
      indigo: colors.indigo,
      blue: colors.blue,
      green: colors.green,
      red: colors.rose,
      yellow: colors.amber,
      'warn-gray': colors.warmGray,
      'true-gray': colors.trueGray,
      gray: colors.gray,
      'cool-gray': colors.coolGray,
      'blue-gray': colors.blueGray,
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
  plugins: [
    require('tailwind-scrollbar')
  ]
}

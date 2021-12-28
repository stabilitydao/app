const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
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
      stone: colors.stone,
      neutral: colors.neutral,
      gray: colors.gray,
      zinc: colors.zinc,
      slate: colors.slate,
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

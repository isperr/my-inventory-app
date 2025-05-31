const theme = require('./theme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: theme.colors
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
  important: '#root'
}

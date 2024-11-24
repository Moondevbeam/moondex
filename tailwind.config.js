/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokedex: {
          red: '#DC0A2D',
          green: '#74CB48',
          gray: {
            light: '#EFEFEF',
            dark: '#666666'
          }
        }
      },
      boxShadow: {
        'custom-inset': '0px 1px 3px 1px #00000040 inset',
      },
    },
  },
  plugins: [],
}


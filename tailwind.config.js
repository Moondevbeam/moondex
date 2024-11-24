/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-inset': '0px 1px 3px 1px #00000040 inset',
      },
    },
  },
  plugins: [],
}


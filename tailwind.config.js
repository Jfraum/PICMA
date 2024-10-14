/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quantico: ["Quantico", "sans-serif"],
      },
      colors: {
        '252422': '#252422',
        'fffcf2' : '#fffcf2',
      },
      placeholder: {
        sm: 'text-xl'
      }
    },
  },
  variants: {
    extend:{
      placeholder:['responsive'],
    },
  },
  plugins: [],
}


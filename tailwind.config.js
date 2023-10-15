/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1565D8",
        secondary:'#e2edfb',
        dark:{
          soft:"#183B56",
          hard:"#0D2436",
          light:'#5A7184',
        },
      },
      fontFamily:{
        metropolis:["'Metropolis'","sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


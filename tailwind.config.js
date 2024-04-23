/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./navigation/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'text': 'black',
      'bar': '#f49d0c'
    }
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9333ea',
        'primary-light': '#c084fc',
      },
    },
  },
  plugins: [],
}

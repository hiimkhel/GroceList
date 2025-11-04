/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        secular: ['Secular One', 'sans-serif'],
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        bg: "rgb(var(--color-bg) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}

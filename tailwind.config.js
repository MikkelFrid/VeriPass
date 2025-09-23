/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      // keep this empty — tokens are defined in `@theme` in globals.css
    },
  },
  plugins: [],
};
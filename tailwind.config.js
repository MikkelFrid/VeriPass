// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // v4 doesn’t need mode: 'jit' or darkMode here unless you want 'media' vs 'class'
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  // IMPORTANT: no require('daisyui') here on v5 — plugin is added in CSS via @plugin
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        // hide caret everywhere except form fields
        '*:not(input):not(textarea):not(select)': {
          caretColor: 'transparent',
        },
        // restore normal caret for form fields
        'input, textarea, select': {
          caretColor: 'auto',
        },
      });
    },
  ],
}


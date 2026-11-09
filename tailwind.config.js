/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fffdf9',
          100: '#fbf7ee',
          200: '#f4ecdc',
          300: '#e7dcbe',
          400: '#d7c79e',
        },
        ink: {
          900: '#15133c',
          800: '#1e1b4b',
          700: '#2e2a72',
          600: '#4338ca',
          500: '#6366f1',
        },
        tealbrand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
        },
        coral: {
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      fontFamily: {
        hand: ['"Patrick Hand"', '"Caveat"', 'cursive', 'sans-serif'],
        workbook: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 2px 0 0 rgba(30, 27, 75, 0.08), 0 10px 20px -5px rgba(30, 27, 75, 0.06)',
        'paper-lg': '0 4px 0 0 rgba(30, 27, 75, 0.1), 0 20px 25px -5px rgba(30, 27, 75, 0.08)',
        'paper-btn': '0 3px 0 0 #0f766e',
        'paper-btn-active': '0 0 0 0 #0f766e',
      }
    },
  },
  plugins: [],
}

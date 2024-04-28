/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#edeff5',
        primary: '#3acf61',
        second: '#1d2e41',
        accent: '#70db8c',
        tertiary: {
          DEFAULT: '#3ea0d6',
          hover: '#77bbe0',
        },

        'select-entry': {
          1: '#8dcf43',
          2: '#3ea0d6',
          3: '#eb8119',
          4: '#7d2880'
        },

        'menu-btn': {
          1: {
            DEFAULT: '#61b1dd',
            hover: '#91c7e6'
          },
          2: {
            DEFAULT: '#3acf61',
            hover: '#6fe38e'
          },
          3: {
            DEFAULT: '#bc5162',
            hover: '#d47282'
          },
          4: {
            DEFAULT: '#e17e70',
            hover: '#de9085'
          },
          5: {
            DEFAULT: '#7d2880',
            hover: '#9e52a1'
          },
        },

        snackbar: {
          error: '#d62f2f',
          success: '#3acf61',
          warning: '#e69720'
        }
      }
    },
  },
  plugins: [],
}


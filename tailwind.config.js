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
        primary: '#4caf50',
        second: '#1d2e41',
        accent: '#77b379',
        tertiary: '#3ea0d6',

        'select-entry': {
          1: '#8dcf43',
          2: '#3ea0d6',
          3: '#eb8119',
          4: '#7d2880'
        },

        'menu-btn': {
          1: {
            DEFAULT: '#61b1dd',
            hover: '#81bbdb'
          },
          2: {
            DEFAULT: '#49ca89',
            hover: '#67cf9b'
          },
          3: {
            DEFAULT: '#bc5162',
            hover: '#b5626f'
          },
          4: {
            DEFAULT: '#e17e70',
            hover: '#de9085'
          },
          5: {
            DEFAULT: '#7d2880',
            hover: '#7b407d'
          },
        },

        snackbar: {
          error: '#d62f2f',
          success: '#30d61e',
          warning: '#e69720'
        }
      }
    },
  },
  plugins: [],
}


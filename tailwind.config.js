/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4caf50',
        second: '#1d2e41',

        menu_btn_1: {
          DEFAULT: '#61b1dd',
          hover: '#81bbdb'
        },
        menu_btn_2: {
          DEFAULT: '#49ca89',
          hover: '#67cf9b'
        },
        menu_btn_3: {
          DEFAULT: '#bc5162',
          hover: '#b5626f'
        },
        menu_btn_4: {
          DEFAULT: '#e17e70',
          hover: '#de9085'
        },
        menu_btn_5: {
          DEFAULT: '#7d2880',
          hover: '#7b407d'
        },
      }
    },
  },
  plugins: [],
}


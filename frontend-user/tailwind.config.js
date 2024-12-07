<<<<<<< HEAD
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/flowbite/**/*.js"
];
export const theme = {
  extend: {},
};
export const plugins = [
  require('flowbite/plugin')
];
=======
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Thêm đường dẫn đến các file trong thư mục src
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito Sans"', 'sans-serif'], // Đặt tên cho font
      },
    },
  },
  plugins: [],
}

>>>>>>> quyen-detailmovie

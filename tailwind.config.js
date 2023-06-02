/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        skeleton: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        skeleton: 'skeleton 1.5s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

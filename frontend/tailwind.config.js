/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradientX: {
          '0%': { 'background-size': '200% 100%', 'background-position': 'right bottom' },
          '50%': { 'background-size': '200% 100%', 'background-position': 'left bottom' },
          '100%': { 'background-size': '200% 100%', 'background-position': 'right bottom' },
        }
      },
      animation: {
        gradientX: 'gradientX 5s ease infinite',
      },
      backgroundImage: theme => ({
        'gradient-anim': 'linear-gradient(270deg, ' + theme('colors.yellow.400') + ', ' + theme('colors.yellow.500') + ', ' + theme('colors.yellow.600') + ', ' + theme('colors.green.400') + ', ' + theme('colors.green.600') + ')',
      }),
    },
  },
  variants: {},
  plugins: [],
};

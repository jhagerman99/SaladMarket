/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        '90': '22rem',
        '128': '32rem',
        '200': '40rem',
      },
      colors: {
        customGreen: '#2FB62D',
        customBlue: '#012738',
        customYellow: '#F8B602',
        customBlack: '#2E2E2E'
      },
      screens: {
        '3xl': '1700px',
        '4xl': '2000px'
      },
    },
  },
  plugins: [],
};

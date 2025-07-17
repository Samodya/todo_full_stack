/** @type {import('@tailwindcss/postcss').TailwindConfig} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: "#23639E",   // Indigo-600 custom color
          secondary: "#FBBF24", // Amber-400
          accent: "#10B981",    // Emerald-500
          headertxt:"#ffffff"
        },
      },
    },
    plugins: [],
  };
  
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand.1": "#1A202C",
        "brand.2": "#81E6D9",
        "brand.3": "#EDF2F7",
        "brand.4": "#A0AEC0",
        "brand.5": "#2d3748",
      },
    },
  },
  plugins: [],
};

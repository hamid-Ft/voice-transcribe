/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-fast": "pulse 300ms linear infinite",
      },
    },
  },
  plugins: [],
};

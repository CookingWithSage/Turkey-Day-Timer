/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm autumn/turkey theme
        primary: '#D97706', // warm orange
        'primary-hover': '#B45309', // darker orange
        success: '#059669', // green for confirmations
        warning: '#DC2626', // red for alerts
        'warm-bg': '#FFFBF5', // warm off-white background
        'gray-text': '#1F2937', // dark gray text
        'gray-secondary': '#6B7280', // medium gray text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

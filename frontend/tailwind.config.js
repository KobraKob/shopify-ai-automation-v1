/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // A calming blue
        secondary: '#7B68EE', // A soft periwinkle
        accent: '#50C878', // A fresh green
        background: '#F0F2F5', // Light grey for background
        card: '#FFFFFF', // White for cards
        textPrimary: '#333333', // Dark grey for primary text
        textSecondary: '#666666', // Medium grey for secondary text
        border: '#D1D5DB', // Light grey for borders
        success: '#28A745', // Green for success messages
        error: '#DC3545', // Red for error messages
      }
    },
  },
  plugins: [],
}

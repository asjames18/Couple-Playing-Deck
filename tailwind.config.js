/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'bg-primary': 'var(--color-bg-primary)',
        'bg-card': 'var(--color-bg-card)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
      },
      fontFamily: {
        base: ['var(--font-family-base)', 'sans-serif'],
      },
      spacing: {
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
      },
      borderRadius: {
        'lg': 'var(--radius-lg)',
      },
      boxShadow: {
        'gaming': 'var(--shadow-gaming)',
      },
    },
  },
  plugins: [],
}


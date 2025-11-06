/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic Gaming Platform Tokens (RGB format for alpha support)
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-gradient-end': 'rgb(var(--bg-gradient-end) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        
        // Primary Accent Colors
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-600': 'rgb(var(--primary-600) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        'gold-600': 'rgb(var(--gold-600) / <alpha-value>)',
        
        // Secondary & Semantic
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
        
        // Surface
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-hover': 'rgb(var(--card-hover) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        
        // Legacy tokens (backward compatibility)
        accent: 'var(--color-accent)',
        'bg-primary': 'var(--color-bg-primary)',
        'bg-card': 'var(--color-bg-card)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-energy': 'var(--gradient-energy)',
        'gradient-overlay': 'var(--gradient-overlay-1)',
        'gradient-fuchsia-amber': 'linear-gradient(135deg, #D946EF, #FACC15)',
        'gradient-fuchsia-amber-horizontal': 'linear-gradient(90deg, #D946EF, #FACC15)',
        'gradient-card': 'linear-gradient(135deg, rgba(217, 70, 239, 0.4), rgba(250, 204, 21, 0.2))',
      },
      fontFamily: {
        base: ['var(--font-family-base)', 'sans-serif'],
        heading: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
      },
      borderRadius: {
        'lg': 'var(--radius-lg)',
        'xl2': '1.25rem',
      },
      boxShadow: {
        'gaming': 'var(--shadow-gaming)',
        'soft': '0 8px 30px rgba(0,0,0,.18)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.focus-visible-ring': {
          '&:focus-visible': {
            outline: '2px solid rgb(var(--primary))',
            outlineOffset: '2px',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 0 4px rgba(217, 70, 239, 0.2)',
          },
        },
      });
    },
  ],
}


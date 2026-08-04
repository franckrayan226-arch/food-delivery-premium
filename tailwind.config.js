/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FasoFree Design System - Warm beige theme
        background: {
          primary: '#FAF6EF',
          secondary: '#F2EBDD',
          tertiary: '#E8E0D3',
          card: '#F2EBDD',
        },
        text: {
          primary: '#2B2621',
          secondary: '#8C8275',
          tertiary: '#6B6359',
          muted: '#5A5349',
        },
        border: {
          light: '#E8E0D3',
          medium: '#D8D0C3',
          dark: '#C8C0B3',
        },
        // Global accent - terracotta
        accent: {
          primary: '#C1652E',
          secondary: '#D1753E',
          muted: '#A1552E',
        },
        // Restaurant-specific colors
        restaurant: {
          cesar: '#B5502E',
          chitir: '#7A2E1A',
          gusto: '#5C6B3C',
          belchiken: '#B8862E'
        },
        // Status colors
        success: '#5C6B3C',
        warning: '#B8862E',
        error: '#B5502E',
        info: '#5C6B7A',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '0',
        'DEFAULT': '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '0',
        'photo': '8px',
        'img': '0',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        patternShift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '20px 20px' },
        },
      },
    },
  },
  plugins: [],
}

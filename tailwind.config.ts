import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003B5C',
        secondary: '#00838F',
        accent: '#D4A843',
        background: '#F7F8FA',
        surface: '#FFFFFF',
        surfaceAlt: '#F7F8FA',
        textPrimary: '#1A1A2E',
        textSecondary: '#5A6275',
        border: '#DDE1E6',
        success: '#198754',
        warning: '#E6930A',
        error: '#DC3545',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        cardHover: '0 4px 12px rgba(0,0,0,0.1)',
        elevated: '0 20px 40px rgba(0,0,0,0.10)',
        nav: '0 2px 12px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
export default config;

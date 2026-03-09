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
        primary: '#0044FF',
        secondary: '#0044FF',
        accent: '#D4A843',
        dark: '#001832',
        background: '#FFFFFF',
        backgroundAlt: '#F4F7FA',
        surface: '#FFFFFF',
        textPrimary: '#1A1A2E',
        textSecondary: '#374151',
        textMuted: '#5A6275',
        border: '#E2E8F0',
        success: '#198754',
        warning: '#E6930A',
        error: '#DC3545',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.35', fontWeight: '600' }],
        'body': ['17px', { lineHeight: '1.7' }],
        'overline': ['13px', { lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      maxWidth: {
        content: '1280px',
        prose: '720px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.06)',
        cardHover: '0 4px 16px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
        nav: '0 1px 3px rgba(0,0,0,0.08)',
        search: '0 4px 24px rgba(0,0,0,0.12)',
        elevated: '0 20px 40px rgba(0,0,0,0.15)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.6s ease-out 0.1s forwards',
        'fade-up-delay-2': 'fadeUp 0.6s ease-out 0.2s forwards',
        'fade-up-delay-3': 'fadeUp 0.6s ease-out 0.3s forwards',
      },
    },
  },
  plugins: [],
};
export default config;

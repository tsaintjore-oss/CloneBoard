/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./shop.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        shop: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        inflow: {
          dark: '#0f1117',
          sidebar: '#181b23',
          card: '#1c1f28',
          border: '#2a2e3a',
          muted: '#6b7280',
          accent: '#3b82f6',
          accentHover: '#2563eb',
        },
        shop: {
          primary: '#2563eb',
          'primary-hover': '#1d4ed8',
          'primary-light': '#dbeafe',
          secondary: '#64748b',
          'secondary-hover': '#475569',
          accent: '#f59e0b',
          'accent-hover': '#d97706',
          success: '#10b981',
          'success-light': '#d1fae5',
          error: '#ef4444',
          'error-light': '#fee2e2',
          background: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
          text: '#1e293b',
          'text-muted': '#64748b',
          'text-light': '#94a3b8',
        }
      }
    },
  },
  plugins: [],
}

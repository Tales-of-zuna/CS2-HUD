/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2.5rem",
          sm: "2.5rem",
        },
      },
      colors: {
        "background-primary": "hsl(var(--background-primary))",
        "background-secondary": "hsl(var(--background-secondary))",
        "background-hover": "hsl(var(--background-hover))",
        "background-light": "hsl(var(--background-light))",
        text: "hsl(var(--text))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-disabled": "hsl(var(--text-disabled))",
        primary: "hsl(var(--primary))",
        "primary-light": "hsl(var(--primary-light))",
        "primary-dark": "hsl(var(--primary-dark))",
        secondary: "hsl(var(--secondary))",
        "secondary-light": "hsl(var(--secondary-light))",
        "secondary-dark": "hsl(var(--secondary-dark))",
        border: "hsl(var(--border-color))",
        button: "hsl(var(--button-color))",
        "button-text": "hsl(var(--button-text))",
      },
      animation: {
        "fade-in": "fadeIn 0.1s ease",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [forms],
};

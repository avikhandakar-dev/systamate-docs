module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      body: ["Inter", "sans-serif"],
      cursive: ["Limelight", "cursive"],
      serif: ["B612", "serif"],
    },
    extend: {
      screens: {
        standalone: { raw: "(display-mode:standalone)" },
      },
      colors: {
        primary: {
          50: "#CBEBFF",
          100: "#B6E3FF",
          200: "#8DD3FF",
          300: "#65C3FF",
          400: "#3CB4FF",
          500: "#13A4FF",
          600: "#0086DA",
          700: "#0063A2",
          800: "#00416A",
          900: "#001E32",
        },
      },
      backgroundImage: (theme) => ({
        "color-ribbon":
          "linear-gradient(to right,#73D2F6,#08C 22%,#7FC400 36%,#FFD583 48%,#FFB21E 63%,#FF4D4D 76%,#503873)",
      }),
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(0.7, 0, 0.3, 1)",
      },
      boxShadow: {
        menu: "0 4px 21px 0 rgb(49 49 49 / 10%)",
        form: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        input: "0 2px 4px 0 rgb(0 0 0 / 6%)",
        blogCard: "0 0 0 1px rgb(0 0 0 / 10%)",
        card: "0 1px 8px 0 rgb(49 49 49 / 10%)",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      transform: ["group-hover"],
      translate: ["group-hover"],
    },
  },
  daisyui: {
    themes: [
      {
        systamateTheme: {
          primary: "#13A4FF",
          "primary-focus": "#3CB4FF",
          "primary-content": "#fff",

          secondary: "#FFD583",
          "secondary-focus": "#FFB21E",
          "secondary-content": "#000",

          accent: "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#d1d5db",
          "base-content": "#1f2937",

          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
};

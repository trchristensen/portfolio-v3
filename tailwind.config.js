const { spacing, fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      colors: require("daisyui/colors"),

      fontFamily: {
        sans: ["IBM Plex Sans", ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
          },
        },
      }),

      spacing: {
        "2/3": "66.666667%",
      },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          primary: "#111111",
          "primary-focus": "#333333",
          "primary-content": "#ffffff",
          secondary: "#444444",
          "secondary-focus": "#888888",
          "secondary-content": "#ffffff",
          accent: "#B91C1C",
          "accent-focus": "#DC2626",
          "accent-content": "#ffffff",
          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#E5E7EB",
          "base-300": "#D1D5DB",
          "base-content": "#1f2937",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
          "--border-color": "var(--b3)",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
      {
        space: {
          primary: "#b9fbc0",
          "primary-focus": "98f5e1",
          "primary-content": "#ffffff",
          secondary: "#a3c4f3",
          "secondary-focus": "#cfbaf0",
          "secondary-content": "#111111",
          accent: "#fbf8cc",
          "accent-focus": "#fde4cf",
          "accent-content": "#ffffff",
          neutral: "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#ffffff",
          "base-100": "#3d4451", // make this darker
          "base-200": "#2a2e37",
          "base-300": "#16181d",
          "base-content": "#ebecf0",
          info: "#66c6ff",
          success: "#87d039",
          warning: "#e2d562",
          error: "#ff6f6f",
        },
      },
      {
        dark: {
          primary: "#ffffff",
          "primary-focus": "#ffffff",
          "primary-content": "#111111",
          secondary: "#868686",
          "secondary-focus": "#7A7A7A",
          "secondary-content": "#242424",
          accent: "#f5e1ac",
          "accent-focus": "#f5e1ac",
          "accent-content": "#111111",
          "base-100": "#1D1D1D",
          "base-200": "#242424",
          "base-300": "#4d4d4d",
          "base-content": "#8e8e8e",
          neutral: "#333333",
          "neutral-focus": "#4d4d4d",
          "neutral-content": "#ffffff",
          info: "#0000ff",
          success: "#008000",
          warning: "#ffff00",
          error: "#ff0000",
          "--border-color": "#4d4d4d",
          "--rounded-box": "1",
          "--rounded-btn": "1",
          "--rounded-badge": "0",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-text-case": "lowercase",
          "--btn-focus-scale": "1",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0",
        },
      },
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "luxury",
      "emerald",
    ],
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};

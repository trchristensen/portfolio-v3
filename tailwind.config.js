const { spacing, fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        conic: "conic-gradient(var(--tw-gradient-stops))",
        "conic-to-t": "conic-gradient(at top, var(--tw-gradient-stops))",
        "conic-to-b": "conic-gradient(at bottom, var(--tw-gradient-stops))",
        "conic-to-l": "conic-gradient(at left, var(--tw-gradient-stops))",
        "conic-to-r": "conic-gradient(at right, var(--tw-gradient-stops))",
        "conic-to-tl": "conic-gradient(at top left, var(--tw-gradient-stops))",
        "conic-to-tr": "conic-gradient(at top right, var(--tw-gradient-stops))",
        "conic-to-bl":
          "conic-gradient(at bottom left, var(--tw-gradient-stops))",
        "conic-to-br":
          "conic-gradient(at bottom right, var(--tw-gradient-stops))",
        radial: "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "radial-at-t":
          "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
        "radial-at-b":
          "radial-gradient(ellipse at bottom, var(--tw-gradient-stops))",
        "radial-at-l":
          "radial-gradient(ellipse at left, var(--tw-gradient-stops))",
        "radial-at-r":
          "radial-gradient(ellipse at right, var(--tw-gradient-stops))",
        "radial-at-tl":
          "radial-gradient(ellipse at top left, var(--tw-gradient-stops))",
        "radial-at-tr":
          "radial-gradient(ellipse at top right, var(--tw-gradient-stops))",
        "radial-at-bl":
          "radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))",
        "radial-at-br":
          "radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))",
      },
      colors: {
        "blue-opaque": "rgb(13 42 148 / 18%)",
        gray: {
          0: "#fff",
          100: "#fafafa",
          200: "#eaeaea",
          300: "#999999",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#111111",
        },
        "blue-gray": colors.blueGray,
        "cool-gray": colors.coolGray,
        "true-gray": colors.trueGray,
        "warm-gray": colors.warmGray,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
      fontFamily: {
        sans: ["IBM Plex Sans", ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            thead: {
              borderBottomColor: theme("colors.gray.200"),
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },

        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              color: theme("colors.gray.100"),
              borderBottomColor: theme("colors.gray.600"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),

      spacing: {
        "2/3": "66.666667%",
      },
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};

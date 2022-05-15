const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        haiti: "#0D1132",
        mirage: "#211931",
        razzmatazz: "#ed1e79",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.haiti"),
            },
            a: {
              color: theme("colors.razzmatazz"),
            },
            code: {
              backgroundColor: theme("colors.gray.200"),
            },
            pre: {
              backgroundColor: theme("colors.haiti"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

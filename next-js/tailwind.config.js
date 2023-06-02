module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}

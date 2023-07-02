/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [
    "./views/*.{html,js,handlebars}",
    "./views/partials/*.{html,js,handlebars}",
  ],
  theme: {
    fontFamily: {
      sans: ["Lato", "Quicksand", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};

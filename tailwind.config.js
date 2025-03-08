// const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        themeGreen: "#23D3A4", // 主题绿
        themeRed: "#FC4F4F", // 主题红
        blockBg: "#111218", // 区块背景色
        themeWowBg: "#170E09", // 主题金 170E09
        themeBlue: "#00BFFF", // 主题蓝
        themeYellow: "#f7b10a", // 主题黄 B98427
        wowText: "#b1997f", // 金色文字
        themeWowRed: "#AA2409", // 主题红色
        wowDeepRed: "#5A0B0A", // 深红色
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require("@tailwindcss/aspect-ratio")],
};

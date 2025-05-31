import { create } from "storybook/internal/theming";

const background = "hsl(0 0% 100%)";
const controlsBackground = "hsl(0 0% 94%)";
const controlsSelectedBackground = "hsl(0 0% 88%)";
const border = "hsl(0 0% 82%)";

export default create({
  base: "light",

  brandTitle: "Godown",
  brandUrl: "https://github.com/startracex/godown",
  brandImage: "/godown-text.svg",

  textColor: "hsl(0 0% 8%)",
  colorSecondary: "hsl(0 0% 44%)",
  colorPrimary: "hsl(0 0% 44%)",

  appBg: background,
  appContentBg: background,
  appPreviewBg: background,
  appBorderColor: border,

  barTextColor: "hsl(0deg 0% 46%)",
  barSelectedColor: "hsl(0 0% 12%)",
  barHoverColor: "hsl(0 0% 34%)",
  barBg: background,

  inputBg: controlsBackground,
  inputBorder: border,
  booleanBg: controlsBackground,
  booleanSelectedBg: controlsSelectedBackground,
  buttonBg: controlsBackground,
  buttonBorder: border,
});

import { create } from "@storybook/theming/create";

const background = "hsl(0 0% 2.5%)";
const controlsBackground = "hsl(0 0% 5.5%)";
const controlsSelectedBackground = "hsl(0 0% 10%)";
const border = "hsl(0 0% 14%)";

export default create({
  base: "dark",

  brandTitle: "Godown",
  brandUrl: "https://github.com/startracex/godown",
  brandImage: "/godown-text.white.svg",

  textColor: "hsl(0 0% 94%)",
  colorSecondary: "hsl(0 0% 17%)",
  colorPrimary: "hsl(0 0% 17%)",

  appBg: background,
  appContentBg: background,
  appPreviewBg: background,
  appBorderColor: border,

  barTextColor: "hsl(0 0% 66%)",
  barSelectedColor: "hsl(0 0% 94%)",
  barHoverColor: "hsl(0 0% 84%)",
  barBg: background,

  inputBg: controlsBackground,
  inputBorder: border,
  booleanBg: controlsBackground,
  booleanSelectedBg: controlsSelectedBackground,
  buttonBg: controlsBackground,
  buttonBorder: border,
});

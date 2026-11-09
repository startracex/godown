import { create } from "storybook/theming";

const background = "hsl(0 0% 2.5%)";
const controlsBackground = "hsl(0 0% 5.5%)";
const controlsSelectedBackground = "hsl(0 0% 10%)";
const border = "hsl(0 0% 14%)";
const text = "hsl(0 0% 94%)";
const muted = "hsl(0 0% 72%)";

export default create({
  base: "dark",

  brandTitle: "Godown",
  brandUrl: "https://github.com/startracex/godown",
  brandImage: "/godown-text.white.svg",

  textColor: text,
  textMutedColor: muted,
  textInverseColor: "hsl(0 0% 8%)",
  colorSecondary: "hsl(0 0% 72%)",
  colorPrimary: "hsl(0 0% 84%)",

  appBg: background,
  appContentBg: background,
  appPreviewBg: background,
  appBorderColor: border,

  barTextColor: muted,
  barSelectedColor: text,
  barHoverColor: "hsl(0 0% 84%)",
  barBg: background,

  inputBg: controlsBackground,
  inputBorder: border,
  inputTextColor: text,
  booleanBg: controlsBackground,
  booleanSelectedBg: controlsSelectedBackground,
  buttonBg: controlsBackground,
  buttonBorder: border,
});

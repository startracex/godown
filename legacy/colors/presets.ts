import { presetsRGB } from "./presets-rgb.js";

export * from "./presets-rgb.js";

type Colors = keyof typeof presetsRGB;

export const colors = Object.keys(presetsRGB) as (Colors)[];
export const presets: Record<Colors, typeof presetsRGB[Colors]> = colors.reduce(
  (cur, acc) => {
    cur[acc] = presetsRGB[acc].map((value) => `rgb(${value})`);
    return cur;
  },
  {} as any,
);

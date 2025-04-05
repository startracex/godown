import { cssGlobalVars } from "./global-style.js";
import { unsafeCSS, type CSSResult } from "lit";

type OutlineOptions = {
  width?: string | CSSResult;
  color?: string | CSSResult;
  selector?: string;
  type?: RingType;
};

const getRingStyles = (width: string | CSSResult, color: string | CSSResult) => {
  const colors = `outline-color:var(${color});border-color:var(${color});`;
  const outline = `${colors}outline-width:var(${width});outline-style:solid;`;
  const outlineInset = `${outline}outline-offset:calc(-1 * var(${width}));`;
  const shadow = `box-shadow:0 0 0 var(${width}) var(${color});`;
  const shadowInset = `box-shadow:inset 0 0 0 var(${width}) var(${color});`;
  const border = `${colors}border-width:var(${width});border-style:solid;`;
  return {
    outline,
    "outline-inset": outlineInset,
    "box-shadow": shadow,
    shadow,
    "box-shadow-inset": shadowInset,
    "shadow-inset": shadowInset,
    border,
  };
};

/**
 * The {@link RingBuilder} class is responsible for generating CSS styles for various types of outline/border/shadow.
 */
export class RingBuilder {
  css: string;

  constructor({
    selector = ":host",
    width = cssGlobalVars.ringWidth,
    color = cssGlobalVars.ringColor,
    type,
  }: OutlineOptions = {}) {
    const styles = getRingStyles(width, color);
    if (type && type in styles) {
      const style = styles[type];
      this.css = `${selector}{${style}}`;
    } else {
      this.css = "";
    }
  }

  get styleSheet(): CSSStyleSheet {
    return unsafeCSS(this.css).styleSheet;
  }
}

export type RingType = "outline" | "outline-inset" | "shadow" | "shadow-inset" | "border" | "none" | undefined;

export const isNone = (type: RingType): boolean => !type || type === "none";

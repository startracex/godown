import { cssGlobalVars } from "./global-style.js";
import { unsafeCSS, type CSSResult } from "lit";

type OutlineOptions = {
  width?: string | CSSResult;
  color?: string | CSSResult;
  selector?: string;
  outlineType?: OutlineType;
};

const getOutlineStyles = (width: string | CSSResult, color: string | CSSResult) => {
  const colors = `outline-color:var(${color});border-color:var(${color});`;
  const outline = `${colors}outline-width:var(${width});outline-style:solid;`;
  return {
    outline,
    "outline-inset": `${outline}outline-offset:calc(-1 * var(${width}));`,
    "box-shadow": `box-shadow:0 0 0 var(${width}) var(${color});`,
    "box-shadow-inset": `box-shadow:inset 0 0 0 var(${width}) var(${color});`,
    border: `${colors}border-width:var(${width});border-style:solid;`,
  };
};

/**
 * The `OutlineBuilder` class is responsible for generating CSS styles for various types of outlines.
 */
export class OutlineBuilder {
  css: string;

  constructor({
    selector = ":host",
    width = cssGlobalVars.outlineWidth,
    color = cssGlobalVars.outlineColor,
    outlineType,
  }: OutlineOptions = {}) {
    const styles = getOutlineStyles(width, color);
    if (outlineType && outlineType in styles) {
      const style = styles[outlineType];
      this.css = `${selector}{${style}}`;
    } else {
      this.css = "";
    }
  }

  get styleSheet(): CSSStyleSheet {
    return unsafeCSS(this.css).styleSheet;
  }
}

export type OutlineType =
  | "outline"
  | "outline-inset"
  | "box-shadow"
  | "box-shadow-inset"
  | "border"
  | "none"
  | undefined;

export const isNone = (type: OutlineType): boolean => !type || type === "none";

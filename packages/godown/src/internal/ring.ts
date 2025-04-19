import { toVar } from "@godown/element";
import { cssGlobalVars } from "./global-style.js";
import { unsafeCSS, type CSSResult } from "lit";

type OutlineOptions = {
  width?: string | CSSResult;
  color?: string | CSSResult;
  selector?: string;
  type?: RingType;
};

const outlineRing = ({ width, color, inset }) =>
  `outline-style:solid;outline-color:${color};outline-width:${width};${inset ? `outline-offset:calc(-1 * ${width});` : ""}`;

const borderRing = ({ width, color }) => `border-style:solid;border-color:${color};border-width:${width};`;

const shadowRing = ({ width, color, inset }) => `box-shadow:${inset ? "inset" : ""} 0 0 0 ${width} ${color};`;

const ringMap = {
  outline: (width, color) => outlineRing({ width, color, inset: false }),
  "outline-inset": (width, color) => outlineRing({ width, color, inset: true }),
  "box-shadow": (width, color) => shadowRing({ width, color, inset: false }),
  shadow: (width, color) => shadowRing({ width, color, inset: false }),
  "box-shadow-inset": (width, color) => shadowRing({ width, color, inset: true }),
  "shadow-inset": (width, color) => shadowRing({ width, color, inset: true }),
  border: (width, color) => borderRing({ width, color }),
};

/**
 * The {@link RingBuilder} class is responsible for generating CSS styles for various types of outline/border/shadow.
 */
export class RingBuilder {
  css: string;

  constructor({
    selector = ":host",
    width = toVar(cssGlobalVars.ringWidth),
    color = toVar(cssGlobalVars.ringColor),
    type,
  }: OutlineOptions = {}) {
    if (type && type in ringMap) {
      const style = ringMap[type](width, color);
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

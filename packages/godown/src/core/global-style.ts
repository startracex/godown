import { type Gradients, presetsRGB } from "@godown/colors/presets-rgb.js";
import { travel } from "@godown/colors/travel.js";
import { GodownElement, joinProperties, trim } from "@godown/element";
import { type CSSResult, css, unsafeCSS } from "lit";

export class GlobalStyle extends GodownElement {}
export default GlobalStyle;

const cssvar = trim(GlobalStyle.godownConfig.prefix, "-");

export function scopePrefix(scope: string, len = 1): CSSResult {
  return variablePrefix(cssvar + "-".repeat(len) + scope);
}

export function variablePrefix(variable: string): CSSResult {
  return unsafeCSS(`--${variable}`);
}

export const cssGlobalVars: {
  clipBackground: CSSResult;
  active: CSSResult;
  passive: CSSResult;
  _colors: PresetsGradientsCSSResult;
  input: CSSResult;
  white: CSSResult;
  black: CSSResult;
  color: CSSResult;
  radius: CSSResult;
  outlineWidth: CSSResult;
  outlineColor: CSSResult;
} = {
  clipBackground: scopePrefix("clip-background", 2),
  active: scopePrefix("active", 2),
  passive: scopePrefix("passive", 2),
  _colors: {} as PresetsGradientsCSSResult,
  input: scopePrefix("input", 2),
  white: scopePrefix("color-white", 2),
  black: scopePrefix("color-black", 2),
  color: scopePrefix("color", 2),
  radius: scopePrefix("radius", 2),
  outlineWidth: scopePrefix("outline-width", 2),
  outlineColor: scopePrefix("outline-color", 2),
};

type PresetsGradientsCSSResult = Record<keyof typeof presetsRGB, Gradients<CSSResult>>;
GlobalStyle.styles = [
  unsafeCSS(
    ":host{" +
      `${cssGlobalVars.black}:rgb(0 0 0);` +
      `${cssGlobalVars.white}:rgb(255 255 255);` +
      travel((key, gradient, rgb) => {
        cssGlobalVars._colors[key] ||= [] as any;
        cssGlobalVars._colors[key].push(unsafeCSS(cssGlobalVars.color + "-" + key + "-" + gradient));
        const endKey = `-${key}-${gradient}`;
        const colorKey = cssGlobalVars.color + endKey;
        return `${colorKey}:rgb(${rgb});`;
      }, presetsRGB).join("") +
      joinProperties([
        [cssGlobalVars.active, `var(${cssGlobalVars._colors.blue[5]})`],
        [cssGlobalVars.passive, `var(${cssGlobalVars._colors.darkgray[5]})`],
        [
          cssGlobalVars.clipBackground,
          `linear-gradient(to bottom, var(${cssGlobalVars._colors.lightgray[0]}), var(${cssGlobalVars._colors.darkgray[0]}))`,
        ],
        [cssGlobalVars.outlineColor, `var(${cssGlobalVars._colors.darkgray[4]})`],
        [cssGlobalVars.outlineWidth, ".075em"],
      ]) +
      "}",
  ),
  css`
    input,
    button,
    dialog {
      border: 0;
      outline: 0;
    }

    * {
      margin: 0;
      padding: 0;
      font-size: 100%;
      font-style: normal;
      box-sizing: border-box;
    }

    :host {
      box-sizing: border-box;
      border-style: none;
      outline-style: none;
    }

    a {
      text-decoration: none;
    }

    span {
      white-space: nowrap;
    }

    svg {
      user-select: none;
    }

    :host([contents]) {
      display: contents;
    }

    [part="root"] {
      width: 100%;
      height: 100%;
    }

    :host([contents]) [part="root"] {
      height: inherit;
      width: inherit;
    }

    :where(:host([contents]) [part="root"]) {
      all: inherit;
      display: revert;
    }
  `,
  css`
    :host {
      ${cssGlobalVars.radius}: 0.2em;
      border-radius: var(${cssGlobalVars.radius});
    }
  `,
];

import { GodownElement, joinDeclarations, joinRules, toVar, trim } from "@godown/element";
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
  backgroundClip: CSSResult;
  active: CSSResult;
  passive: CSSResult;
  input: CSSResult;
  radius: CSSResult;
  ringWidth: CSSResult;
  ringColor: CSSResult;
  background: CSSResult;
  foreground: CSSResult;
} = {
  background: scopePrefix("background", 2),
  foreground: scopePrefix("foreground", 2),
  backgroundClip: scopePrefix("background-clip", 2),
  active: scopePrefix("active", 2),
  passive: scopePrefix("passive", 2),
  input: scopePrefix("input", 2),
  radius: scopePrefix("radius", 2),
  ringWidth: scopePrefix("ring-width", 2),
  ringColor: scopePrefix("ring-color", 2),
};

GlobalStyle.styles = [
  unsafeCSS(
    joinRules({
      ":host": joinDeclarations([
        [cssGlobalVars.background, "hsl(0 0% 4%)"],
        [cssGlobalVars.foreground, "hsl(0 0% 96%)"],
        [cssGlobalVars.active, "hsl(0 0% 96%)"],
        [cssGlobalVars.passive, "hsl(0 0% 18%)"],
        [cssGlobalVars.backgroundClip, "linear-gradient(to bottom, hsl(0deg 0% 100%), hsl(0deg 0% 30%))"],
        [cssGlobalVars.ringColor, toVar(cssGlobalVars.passive)],
        [cssGlobalVars.ringWidth, ".075em"],
      ]),
    }),
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

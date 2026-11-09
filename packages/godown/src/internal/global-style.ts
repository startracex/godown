import { GodownElement } from "@godown/element";
import { type CSSResult, css, unsafeCSS } from "lit";
import { resetStyle } from "./reset-style.js";
import { trim } from "sharekit";

export class GlobalStyle extends GodownElement {}

export default GlobalStyle;

const cssvar = trim(GlobalStyle.godownConfig.prefix, "-");

type CSSResult_Var = CSSResult & { toVar: () => CSSResult };

export function scopePrefix(scope: string, len = 1): CSSResult_Var {
  return variablePrefix(cssvar + "-".repeat(len) + scope);
}

export function variablePrefix(variable: string): CSSResult_Var {
  const v = unsafeCSS(`--${variable}`) as CSSResult_Var;
  v.toVar = () => unsafeCSS(`var(${v})`);
  return v;
}

export const cssGlobalVars: {
  backgroundClip: CSSResult_Var;
  active: CSSResult_Var;
  passive: CSSResult_Var;
  input: CSSResult_Var;
  radius: CSSResult_Var;
  ringWidth: CSSResult_Var;
  ringColor: CSSResult_Var;
  background: CSSResult_Var;
  foreground: CSSResult_Var;
  elevated: CSSResult_Var;
  muted: CSSResult_Var;
  accent: CSSResult_Var;
  inverse: CSSResult_Var;
  primaryBackground: CSSResult_Var;
  primaryForeground: CSSResult_Var;
} = {
  background: scopePrefix("background", 2),
  foreground: scopePrefix("foreground", 2),
  elevated: scopePrefix("elevated", 2),
  muted: scopePrefix("muted", 2),
  accent: scopePrefix("accent", 2),
  inverse: scopePrefix("inverse", 2),
  backgroundClip: scopePrefix("background-clip", 2),
  primaryBackground: scopePrefix("primary", 2),
  primaryForeground: scopePrefix("primary-foreground", 2),
  active: scopePrefix("active", 2),
  passive: scopePrefix("passive", 2),
  input: scopePrefix("input", 2),
  radius: scopePrefix("radius", 2),
  ringWidth: scopePrefix("ring-width", 2),
  ringColor: scopePrefix("ring-color", 2),
};

GlobalStyle.styles = [
  resetStyle,
  css`
    @supports (color: light-dark(#fff, #000)) {
      :host {
        ${cssGlobalVars.background}: light-dark(hsl(0 0% 97%), hsl(0 0% 5%));
        ${cssGlobalVars.elevated}: light-dark(hsl(0 0% 100%), hsl(0 0% 9%));
        ${cssGlobalVars.muted}: light-dark(hsl(0 0% 90%), hsl(0 0% 16%));
        ${cssGlobalVars.accent}: light-dark(hsl(0 0% 78%), hsl(0 0% 28%));
        ${cssGlobalVars.foreground}: light-dark(hsl(0 0% 8%), hsl(0 0% 94%));
        ${cssGlobalVars.inverse}: light-dark(hsl(0 0% 8%), hsl(0 0% 94%));
      }
    }
    @supports not (color: light-dark(#fff, #000)) {
      :host {
        ${cssGlobalVars.background}: hsl(0 0% 5%);
        ${cssGlobalVars.elevated}: hsl(0 0% 9%);
        ${cssGlobalVars.muted}: hsl(0 0% 16%);
        ${cssGlobalVars.accent}: hsl(0 0% 28%);
        ${cssGlobalVars.foreground}: hsl(0 0% 94%);
        ${cssGlobalVars.inverse}: hsl(0 0% 94%);
      }
    }
  `,
  css`
    :host {
      ${cssGlobalVars.primaryBackground}: ${cssGlobalVars.foreground.toVar()};
      ${cssGlobalVars.primaryForeground}: ${cssGlobalVars.background.toVar()};
      ${cssGlobalVars.active}: ${cssGlobalVars.primaryBackground.toVar()};
      ${cssGlobalVars.passive}: ${cssGlobalVars.muted.toVar()};
      ${cssGlobalVars.ringColor}: ${cssGlobalVars.muted.toVar()};
      ${cssGlobalVars.ringWidth}: 0.1em;
      ${cssGlobalVars.radius}: 0.25em;
      ${cssGlobalVars.backgroundClip}: linear-gradient(
        to bottom,
        ${cssGlobalVars.foreground.toVar()},
        ${cssGlobalVars.muted.toVar()}
      );
    }
  `,
  css`
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
      border-radius: ${cssGlobalVars.radius.toVar()};
      border-style: none;
      outline-style: none;
    }
  `,
];

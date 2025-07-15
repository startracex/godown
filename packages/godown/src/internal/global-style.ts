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
  primaryBackground: CSSResult_Var;
  primaryForeground: CSSResult_Var;
  muted: CSSResult_Var;
} = {
  background: scopePrefix("background", 2),
  foreground: scopePrefix("foreground", 2),
  backgroundClip: scopePrefix("background-clip", 2),
  primaryBackground: scopePrefix("primary", 2),
  primaryForeground: scopePrefix("primary-foreground", 2),
  muted: scopePrefix("muted", 2),
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
        ${cssGlobalVars.background}: light-dark(hsl(0 0% 96%), hsl(0 0% 4%));
        ${cssGlobalVars.foreground}: light-dark(hsl(0 0% 4%), hsl(0 0% 96%));
        ${cssGlobalVars.muted}: light-dark(hsl(0 0% 88%), hsl(0 0% 18%));
      }
    }
    @supports not (color: light-dark(#fff, #000)) {
      :host {
        ${cssGlobalVars.background}: hsl(0 0% 4%);
        ${cssGlobalVars.foreground}: hsl(0 0% 96%);
        ${cssGlobalVars.muted}: hsl(0 0% 18%);
      }
    }
  `,
  css`
    :host {
      ${cssGlobalVars.primaryBackground}: ${cssGlobalVars.foreground.toVar()};
      ${cssGlobalVars.primaryForeground}:${cssGlobalVars.background.toVar()};
      ${cssGlobalVars.active}: ${cssGlobalVars.primaryBackground.toVar()};
      ${cssGlobalVars.passive}: ${cssGlobalVars.muted.toVar()};
      ${cssGlobalVars.ringColor}: ${cssGlobalVars.passive.toVar()};
      ${cssGlobalVars.ringWidth}: .1em;
      ${cssGlobalVars.radius}: .25em;
      ${cssGlobalVars.backgroundClip}: linear-gradient(to bottom, ${cssGlobalVars.foreground.toVar()}, ${cssGlobalVars.muted.toVar()});
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

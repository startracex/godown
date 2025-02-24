import type { CSSResult } from "lit";

import { type Entry, isNullable, isObject, toEntries } from "./lib.js";

type LikeString = string | { toString(): string };

export const joinRules = (rules: Entry<string, string | Entry<LikeString>>): string => {
  let result = "";
  for (const [key, value] of toEntries(rules)) {
    if (value) {
      const properties = isObject(value) && !("_$cssResult$" in value) ? joinDeclarations(value) : value;
      if (properties) {
        result += key ? `${key}{${properties}}` : properties;
      }
    }
  }
  return result;
};

export const joinDeclarations = (props: Entry<LikeString>): string => {
  let result = "";
  for (const [key, value] of toEntries(props)) {
    if (key && !isNullable(value)) {
      result += `${key}:${value};`;
    }
  }
  return result;
};

export const toVar = (a: LikeString, b?: LikeString): string => (a ? `var(${a}${b ? `,${b}` : ""})` : "");

export const toStyleSheet = (style: string | CSSStyleSheet | CSSResult): CSSStyleSheet => {
  if (!(style instanceof CSSStyleSheet)) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(String(style));
    return sheet;
  }
  return style;
};

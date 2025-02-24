import type { CSSResult } from "lit";

import { type Entry, isObject, toEntries } from "./lib.js";

export const joinRules = (rules: Entry<string, string | Entry<string | LikeString>>): string => {
  let result = "";
  for (const [key, value] of toEntries(rules)) {
    if (value) {
      const properties = !isObject(value) ? value : joinProperties(value);
      if (properties) {
        result += key ? `${key}{${properties}}` : properties;
      }
    }
  }
  return result;
};

export const joinProperties = (props: Entry<string | LikeString>): string => {
  let result = "";
  for (const [key, value] of toEntries(props)) {
    if (key && (value || value === 0 || value === "")) {
      result += `${key}:${value};`;
    }
  }
  return result;
};

export const toVar = (a: LikeString, b?: LikeString): string => (a ? `var(${a}${b ? `,${b}` : ""})` : "");

interface LikeString {
  toString(): string;
}

export const toStyleSheet = (style: string | CSSStyleSheet | CSSResult): CSSStyleSheet => {
  if (!(style instanceof CSSStyleSheet)) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(String(style));
    return sheet;
  }
  return style;
};

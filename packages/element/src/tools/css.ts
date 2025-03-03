import type { CSSResult } from "lit";

import { type Entry, isNullable, isObject, isString, toEntries } from "./lib.js";

type LikeString = string | { toString(): string };

const isCSSResult = (value: unknown): value is CSSResult => {
  return isObject(value) && "_$cssResult$" in value;
};

export const joinRules = (rules: Entry<string, string | Entry<LikeString>>): string => {
  let result = "";
  for (const [key, value] of toEntries(rules)) {
    if (value) {
      const properties = isObject(value) && !isCSSResult(value) ? joinDeclarations(value) : value;
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
  if (isString(style)) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(style);
    return sheet;
  }
  if (isCSSResult(style)) {
    return style.styleSheet;
  }
  return style;
};

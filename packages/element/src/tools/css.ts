import type { CSSResult } from "lit";

import { type Entry, isObject, toEntries } from "./lib.js";
import { isNullable } from "../tools/lib.js";

/**
 * Call Object.values and join "".
 */
export const constructCSS = <K extends string, V extends string | number | CSSResult>(
  vars: string[],
  props: Record<K, V[]>,
  selectorFunc?: (raw?: string, index?: number) => string,
  propertyFunc?: (raw?: V, index?: number) => any,
): string => {
  return Object.values(constructCSSObject(vars, props, selectorFunc, propertyFunc)).join("");
};

/**
 * Create a CSS style object based on the provided variable name array and property object.
 * @param vars - Variable name array.
 * @param props - Property object containing style values for each variable.
 * @param selectorFunc Function to process selector.
 * @param propertyFunc Function to process property.
 * @return CSS style object with selectors as keys and corresponding styles as values.
 */
export const constructCSSObject = <
  K extends string,
  V extends string | number | CSSResult,
  R extends Record<K, string>,
>(
  vars: string[],
  props: Record<K, V[]>,
  selectorFunc?: (raw?: string, index?: number) => string,
  propertyFunc?: (raw?: V, index?: number) => any,
): R => {
  const cssObject = {} as R;
  Object.keys(props).forEach((sel, index0) => {
    const rules = vars.reduce((acc: string[], key, index) => {
      let value = props[sel][index] as V;
      value = (propertyFunc ? propertyFunc(value, index) : value) as V;
      if (!isNullable(value)) {
        acc.push(`${key}:${value}`);
      }
      return acc;
    }, []);
    cssObject[sel] = `${selectorFunc ? selectorFunc(sel, index0) : sel}{${rules.join(";")}}`;
  });
  return cssObject;
};

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

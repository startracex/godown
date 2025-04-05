import { type CSSResult, unsafeCSS } from "lit";

import { type Entry, isNullable, isObject, isString, toEntries } from "./lib.js";

type LikeString = string | { toString(): string };

const isCSSResult = (value: unknown): value is CSSResult => {
  return isObject(value) && "_$cssResult$" in value;
};

const isAcceptValue = (value: unknown): boolean => !isNullable(value) && value !== false;

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

export const selectContain = (name: LikeString, value?: LikeString): string =>
  value ? `[${name}~="${value}"]` : `[${name}]`;

export const selectHost = (value?: LikeString) => `:host${value ? `(${value})` : ""}`;

export const selectPart = (value: LikeString, pseudo?: boolean): string =>
  pseudo ? `::part(${value})` : selectContain("part", value);

export const joinRules = (rules: Entry<LikeString, LikeString | Entry<LikeString>>): string => {
  let result = "";
  for (const [key, value] of toEntries(rules)) {
    if (value) {
      const properties = isObject(value) && !isCSSResult(value) ? joinDeclarations(value) : value;
      if (isAcceptValue(properties)) {
        result += key ? `${key}{${properties}}` : properties;
      }
    }
  }
  return result;
};

export const joinDeclarations = (props: Entry<LikeString>): string => {
  let result = "";
  for (const [key, value] of toEntries(props)) {
    if (key && isAcceptValue(value)) {
      result += `${key}:${value};`;
    }
  }
  return result;
};

export const ifSupports = (
  condition: string,
  { truecase, falsecase }: { truecase?: string; falsecase?: string },
): string => {
  const supportsAtRule = "@supports";
  let result = "";
  if (truecase) {
    result += `${supportsAtRule}(${condition}){${truecase}}`;
  }
  if (falsecase) {
    result += `${supportsAtRule} not(${condition}){${falsecase}}`;
  }
  return result;
};

export const declareLightDarkColors = (
  selector: LikeString,
  props: Entry<LikeString, [LikeString, LikeString]>,
  prefer: 0 | 1,
): string => {
  const arr = [...toEntries(props)];
  const lightDarkFunc = ([key, [light, dark]]) => [key, `light-dark(${light},${dark})`];
  const preferFunc = ([key, value]) => [key, value[prefer]];
  return ifSupports("color:light-dark(#fff,#000)", {
    truecase: joinRules([[selector, joinDeclarations(arr.map(lightDarkFunc))]]),
    falsecase: joinRules([[selector, joinDeclarations(arr.map(preferFunc))]]),
  });
};

export const toVar = (a: LikeString, b?: LikeString): string => (a ? `var(${a}${b ? `,${b}` : ""})` : "");

export const wrapCSSResult = <T extends any[]>(fn: (...args: T) => any): (...args: T) => CSSResult => (...args: T) =>
  unsafeCSS(fn(...args));

import { isArray, isObject } from "sharekit";
import type { attr } from "./attr.js";

export const combineToken = (a: string, b: string): string => (a ? a + (b ? " " + b : "") : b) || "";

type TokenListItem = string | Record<string, any> | TokenListItem[];

/**
 * tokenList combines tokens into a single string,
 * it does not trim blanks and remove duplicates.
 *
 * To set element attributes, use {@link attr}.
 *
 * Useful for classList, part, etc.
 *
 * @param args Tokens to combine.
 * @returns Combined string.
 */
export const tokenList = (...args: TokenListItem[]): string =>
  args.reduce<string>((acc: string, cur: TokenListItem) => {
    if (!cur) {
      return acc;
    }
    if (isArray(cur)) {
      return combineToken(acc, tokenList(...cur));
    }
    if (isObject(cur)) {
      for (const key in cur) {
        if (cur[key]) {
          acc = combineToken(acc, key);
        }
      }
      return acc;
    }
    return combineToken(acc, cur);
  }, "");

export default tokenList;

const splitTokenRegexp = /\s+/;

export const clean = (str: string): string => {
  return [...new Set(str.split(splitTokenRegexp))].join(" ");
};

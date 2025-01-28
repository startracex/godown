import { fuse } from "../tools/lib.js";
import { type attr } from "./attr.js";

const append = fuse;

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
    if (Array.isArray(cur)) {
      return append(acc, tokenList(...cur));
    }
    if (typeof cur === "object") {
      for (const key in cur) {
        if (cur[key]) {
          acc = append(acc, key);
        }
      }
      return acc;
    }
    return append(acc, cur);
  }, "");

export default tokenList;

export const clean = (str: string): string => {
  return [...new Set(str.split(/\s+/))].join(" ");
};

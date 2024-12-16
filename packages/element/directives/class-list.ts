const append = (a: any, b: string) => a ? a + (b ? " " + b : "") : b;

/**
 * Returns a string of space-separated class names based on the input arguments.
 */
export const classList = (...args: (string | string[] | Record<string, any>)[]): string =>
  args.reduce<string>((acc, cur) => {
    if (Array.isArray(cur)) {
      return append(acc, cur.join(" "));
    }
    if (typeof cur === "object") {
      const s1 = Object.entries(cur).reduce((acc1, [key, value]) => {
        return value ? append(acc1, key) : acc1;
      }, "");
      return append(acc, s1);
    }
    return append(acc, cur);
  }, "");

export const clean = (str: string): string => {
  return [...new Set(str.split(/\s+/))].join(" ");
};

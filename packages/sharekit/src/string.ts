export const join = (a: string, b: string, sep?: string): string => (a ? a + (b ? (sep || "") + b : "") : b) || "";

export const infixed = (a: string, b: string, c: string): boolean => a.startsWith(b) && a.endsWith(c);

export const trimStartFunc = (s: string, func: (s: string) => boolean): string => {
  if (!s || !func) {
    return s;
  }
  let start = 0;
  while (start < s.length && func(s.slice(start, start + 1))) {
    start += 1;
  }
  return s.slice(start);
};

export const trimEndFunc = (s: string, func: (s: string) => boolean): string => {
  if (!s || !func) {
    return s;
  }
  let end = s.length;
  while (end > 0 && func(s.slice(end - 1, end))) {
    end -= 1;
  }
  return s.slice(0, end);
};

export const trimFunc = (s: string, func: (_: string) => boolean): string => trimStartFunc(trimEndFunc(s, func), func);

export const trimStart = (s: string, spec: string): string => trimStartFunc(s, (str) => str === spec);

export const trimEnd = (s: string, spec: string): string => trimEndFunc(s, (str) => str === spec);

export const trim = (s: string, spec: string): string => trimFunc(s, (str) => str === spec);

const splitWords = (s: string): string[] => s.match(/[A-Z][^A-Z_-\s]*|[^A-Z_-\s]+/g)?.map((s) => s.toLowerCase()) || [];

export const capitalize = <T extends string>(s: T): Capitalize<T> =>
  (s.slice(0, 1).toUpperCase() + s.slice(1)) as Capitalize<T>;

export const uncapitalize = <T extends string>(s: T): Uncapitalize<T> =>
  (s.slice(0, 1).toLowerCase() + s.slice(1)) as Uncapitalize<T>;

export const toCamel = (s: string, u?: boolean): string => {
  const tokens = splitWords(s);
  if (!tokens.length) {
    return "";
  }
  const first = tokens.shift()!;
  const rest = tokens.map(capitalize);
  return (u ? capitalize(first) : first) + rest.join("");
};

export const toDash = (s: string): string => splitWords(s).join("-");

export const toSnake = (s: string): string => splitWords(s).join("_");

export const toKebab = toDash;

export const toPascal = (s: string): string => toCamel(s, true);

export const toMacro = (s: string): string => toSnake(s).toUpperCase();

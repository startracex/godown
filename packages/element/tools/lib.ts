/**
 * Returns true if the value is null or undefined.
 */
export const isNil = (value: any): boolean =>
  // eslint-disable-next-line eqeqeq
  value == null;

/**
 * Returns true if the value is a number.
 */
export const isNumerical = (value?: string | number): boolean => !isNaN(+value);

/**
 * Returns a random number between m and n.
 */
export const random = (m = 0, n = 1): number => {
  const max = Math.max(m, n);
  const min = Math.min(m, n);
  return Math.random() * (max - min) + min;
};

/**
 * trimRight remove all characters from the right of a string that are present in a given string.
 */
export const trimRight = (s: string, spec = " "): string => {
  if (!s || !spec) {
    return s;
  }
  let end = s.length;
  while (end > 0 && s.slice(end - spec.length, end) === spec) {
    end -= spec.length;
  }
  return s.slice(0, end);
};

/**
 * trimLeft remove all characters from the left of a string that are present in a given string.
 */
export const trimLeft = (s: string, spec = " "): string => {
  if (!s || !spec) {
    return s;
  }
  let start = 0;
  while (start < s.length && s.slice(start, start + spec.length) === spec) {
    start += spec.length;
  }
  return s.slice(start);
};

export const trim = (s: string, spec?: string): string => {
  return trimRight(trimLeft(s, spec), spec);
};

/**
 * Construct a object with the properties of obj except for those in keys.
 */
export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key as K)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Omit<T, K>);
};

/**
 * From obj, pick a set of properties whose keys are in keys.
 */
export const pick = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
};

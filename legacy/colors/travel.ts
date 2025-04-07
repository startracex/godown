export const travel = <
  T,
  S extends Record<string, any[]>,
>(
  fn: (
    key: keyof S,
    gradient: number,
    rgb: S[keyof S],
  ) => T,
  src: S,
): T[] => Object.entries(src).flatMap(([k, v]) => v.map((rgb, index) => fn(k, index, rgb)));

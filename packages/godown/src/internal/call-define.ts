export const define = <
  T extends {
    define: (...args: any[]) => any;
  },
>(
  e: T,
): T => {
  e.define();
  return e;
};

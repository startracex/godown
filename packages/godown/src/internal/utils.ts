export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  let result: ReturnType<T> | undefined;
  let proxyFunction = function (this: any, ...args) {
    result = fn.apply(this, args);
    proxyFunction = (() => result) as T;
    return result;
  } as T;

  return proxyFunction;
}

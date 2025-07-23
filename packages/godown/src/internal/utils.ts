export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  let result: ReturnType<T> | undefined;
  let called = false;
  return ((...args: Parameters<T>) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result!;
  }) as T;
}

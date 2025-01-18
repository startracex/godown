export function* loop<T>(len: number, fn: (index?: number) => T, reverse?: boolean): Generator<T> {
  if (reverse) {
    for (let index = len - 1; index >= 0; index--) {
      yield fn(index);
    }
  } else {
    for (let index = 0; index < len; index++) {
      yield fn(index);
    }
  }
}

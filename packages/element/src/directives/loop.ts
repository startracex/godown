/**
 * Generates a sequence of values by repeatedly calling the provided function.
 *
 * @param len - The number of values to generate.
 * @param fn - The function to call for each value in the sequence. The function can optionally take the current index as a parameter.
 * @param reverse - If true, the sequence will be generated in reverse order.
 * @returns A generator that yields the values produced by calling the provided function.
 */
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

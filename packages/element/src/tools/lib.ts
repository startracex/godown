import { isArray } from "sharekit";

export * from "sharekit";

export type Entry<K = PropertyKey, V = any> = (Record<K extends PropertyKey ? K : PropertyKey, V>) | [K, V][];

export function* toEntries<K, V>(o: Entry<K, V>): Generator<[K, V], void, void> {
  for (const [k, v] of isArray(o) ? o : (Object.entries(o) as [K, V][])) {
    yield [k, v];
  }
}

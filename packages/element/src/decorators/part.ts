import { query, type QueryDecorator } from "lit/decorators.js";

const selectPart = (value: string | {}, pseudo?: boolean): string =>
  pseudo ? `::part(${value})` : selectContain("part", value);
const selectContain = (name: string | {}, value?: string | {}): string => value ? `[${name}~="${value}"]` : `[${name}]`;

/**
 * Alias for `query(`[part=${partName}]`, cache)`.
 *
 * Default cache.
 *
 * @param partName - The name of the part to query.
 * @returns Decorator.
 */
export const queryPart = (partName: string, cache = true): QueryDecorator => query(selectPart(partName), cache);

export { queryPart as part };

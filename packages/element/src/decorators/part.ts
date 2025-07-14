import { query, type QueryDecorator } from "lit/decorators.js";
import { selectPart } from "../tools/css.js";

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

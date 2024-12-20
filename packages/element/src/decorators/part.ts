import { query, type QueryDecorator } from "lit/decorators.js";

/**
 * Alias for `query(`[part=${partName}]`, cache)`.
 *
 * Default cache.
 *
 * @param partName - The name of the part to query.
 */
export const part = (partName: string, cache = true): QueryDecorator => query(`[part=${partName}]`, cache);

export default part;

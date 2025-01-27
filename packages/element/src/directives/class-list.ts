import { tokenList } from "./token-list.js";

export { clean } from "./token-list.js";

/**
 * @deprecated use {@link tokenList} instead
 */
export const classList: typeof tokenList = tokenList;

export default classList;

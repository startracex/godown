import { html, nothing, type TemplateResult } from "lit";

import { joinRules } from "../tools/css.js";
import { isString } from "sharekit";

/**
 * Style element directive.
 *
 * @param style String of CSS style.
 * @param media Style media attribute.
 * @returns TemplateResult or nothing.
 */
export const htmlStyle = (style?: string | Record<string, any>, media?: string): TemplateResult<1> | typeof nothing => {
  if (!style) {
    return nothing;
  }
  const styleString = isString(style) ? style : joinRules(style);
  return styleString
    ? html`<style media="${media || nothing}">${styleString}</style>`
    : nothing;
};

export default htmlStyle;

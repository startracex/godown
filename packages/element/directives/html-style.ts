import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import { joinRules } from "../tools/css.js";

/**
 * Style element directive.
 *
 * @param style String of CSS style.
 * @param media Style media attribute.
 */
export const htmlStyle = (style?: string | Record<string, any>, media?: string) => {
  if (!style) {
    return nothing;
  }
  const styleString = typeof style === "string" ? style : joinRules(style);
  return styleString
    ? html`<style media="${ifDefined(media)}">${styleString}</style>`
    : nothing;
};

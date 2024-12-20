import { godown } from "@godown/element";
import { property } from "lit/decorators.js";

import SuperAnchor from "../core/super-anchor.js";
import Router from "./router.js";

const protoName = "link";

/**
 * {@linkcode Link} is used for link jumping.
 *
 * Set `type` to `"push" `or `"replace"`,
 * will invoke the history api and trigger the {@linkcode Router.updateAll}.
 *
 * @category navigation
 */
@godown(protoName)
class Link extends SuperAnchor {
  /**
   * If "push", call `history.pushState`.
   *
   * If "replace", call `history.replaceState`.
   *
   * If "normal", behave like a normal anchor.
   */
  @property()
  type: "push" | "replace" | "normal" = "normal";

  /**
   * Suppress the update of the {@linkcode Router}.
   */
  @property({ type: Boolean })
  suppress = false;

  protected _handleClick(e: MouseEvent): void {
    if (this.type === "push" || this.type === "replace") {
      e.preventDefault();
      (history[`${this.type}State`])(null, "", this.href);
      if (!this.suppress) {
        Router.updateAll();
      }
    }
  }
}

export default Link;
export { Link };

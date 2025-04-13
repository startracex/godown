import { godown, styles } from "@godown/element";

import Button from "../button/component.js";
import { css } from "lit";

const protoName = "badge";

/**
 * {@linkcode Badge} renders a badge.
 *
 * @slot - Badge content.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    font-size: 0.75em;
  }

  [part="root"] {
    padding: 0 0.5em;
  }
`)
class Badge extends Button {
  plain: never = true as never;
  round: Button["round"] = true;
}

export default Badge;
export { Badge };

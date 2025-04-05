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
`)
class Badge extends Button {
  plain: Button["plain"] = true;
  round: Button["round"] = true;
}

export default Badge;
export { Badge };

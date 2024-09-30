import { godown, styles } from "@godown/element/decorators/index.js";
import { css } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "divider";

/**
 * {@linkcode Divider} similar to <hr>.
 *
 * This component does not render content.
 *
 * @category layout
 */
@godown(protoName)
@styles(
  css`
  :host{
    width: 100%;
    height: .05em;
    margin: auto;
    display: block;
    background: currentColor;
  }
  :host([vertical]) {
    width: .05em;
    height: max(1em, 100%);
  }
  `,
)
class Divider extends GlobalStyle {
  /**
   * Vertical display.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  connectedCallback() {
    this.createRenderRoot();
  }
}

export default Divider;

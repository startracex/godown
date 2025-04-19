import { attr, godown, htmlSlot, StyleController, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";
import type Layout from "../layout/component.js";
import { RingBuilder, type RingType } from "../../internal/ring.js";

const protoName = "card";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Card} renders a card.
 *
 * This may be similar to {@linkcode Layout},
 * but it needs to be specified to enable header and footer.
 *
 * @slot - The main content of the card.
 * @slot header - The header of the card.
 * @slot footer - The footer of the card.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--padding: .75em;
    background: var(${cssGlobalVars.background});
    color: var(${cssGlobalVars.foreground});
    display: block;
    flex-shrink: 0;
  }

  slot {
    display: block;
    padding: var(${cssScope}--padding);
  }

  [part="root"] {
    border-radius: inherit;
  }

  [name="footer"] {
    padding-top: 0;
  }

  [name="header"] {
    padding-bottom: 0;
  }
`)
class Card extends GlobalStyle {
  constructor() {
    super();
    new StyleController(this, () => new RingBuilder({ type: this.ringType }).css);
  }

  @property({ attribute: "ring-type" })
  ringType: RingType = "border";

  /**
   * Whether to display the header.
   */
  @property({ type: Boolean })
  footer = false;

  /**
   * Whether to display the footer.
   */
  @property({ type: Boolean })
  header = false;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${[this.header ? htmlSlot("header") : "", htmlSlot(), this.footer ? htmlSlot("footer") : ""]}
      </div>
    `;
  }
}

export default Card;
export { Card };

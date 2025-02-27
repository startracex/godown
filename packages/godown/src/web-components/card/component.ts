import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";
import type Layout from "../layout/component.js";

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
    ${cssScope}--border-width: .075em;
    ${cssScope}--border-color: var(${cssGlobalVars.passive});
    ${cssScope}--padding: .75em;
    display: block;
    flex-shrink: 0;
  }

  slot {
    display: block;
    padding: var(${cssScope}--padding);
  }

  [part="root"] {
    border-color: var(${cssScope}--border-color);
    border-style: solid;
    border-width: var(${cssScope}--border-width);
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

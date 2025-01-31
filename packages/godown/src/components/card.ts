import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../core/global-style.js";
import type Layout from "../layout.js";

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
    ${cssScope}--padding: .5em;
    border-width: var(${cssScope}--border-width);
    display: block;
    flex-shrink: 0;
    border-radius: 0.2em;
  }

  slot {
    display: block;
    padding: var(${cssScope}--padding);
  }

  :host,
  slot {
    border-color: var(${cssScope}--border-color);
    border-style: solid;
  }

  [part="root"] {
    width: 100%;
  }

  [name="footer"] {
    border-top-width: var(${cssScope}--border-width);
  }

  [name="header"] {
    border-bottom-width: var(${cssScope}--border-width);
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

import { attr, godown, htmlSlot, styles } from "@godown/element";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../core/global-style.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
@styles(
  css`
    :host {
      ${cssScope}--background: var(${cssGlobalVars.background});
      ${cssScope}--border-width: .0375em;
      ${cssScope}--border-color: transparent;
      ${cssScope}--border-background: var(${cssGlobalVars.passive});
      ${cssScope}--padding: .75em;
      color: var(${cssGlobalVars.foreground});
      background: var(${cssScope}--background);
      border-width: var(${cssScope}--border-width);
      display: block;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    slot {
      display: block;
      padding: var(${cssScope}--padding);
    }

    :host,
    slot {
      border-color: var(${cssScope}--border-background);
      border-style: solid;
    }

    [name=footer] {
      border-top-width: var(${cssScope}--border-width);
    }

    [name=header] {
      border-bottom-width: var(${cssScope}--border-width);
    }
  `,
)
class Card extends GlobalStyle {
  @property({ type: Boolean })
  footer = false;

  @property({ type: Boolean })
  header = false;

  protected render(): TemplateResult<1> {
    return html`<div part="root" ${attr(this.observedRecord)}>
      ${[this.header ? htmlSlot("header") : "", htmlSlot(), this.footer ? htmlSlot("footer") : ""]}
    </div>`;
  }
}

export default Card;
export { Card };

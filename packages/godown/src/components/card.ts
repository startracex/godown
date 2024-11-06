import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { css, html } from "lit";
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
      ${cssScope}--shadow-width: .0375em;
      ${cssScope}--shadow-color: transparent;
      ${cssScope}--background: var(${cssGlobalVars.background});
      ${cssScope}--divider-width: 100%;
      ${cssScope}--divider-height: var(${cssScope}--shadow-width);
      ${cssScope}--divider-background: var(${cssGlobalVars.passive});
      ${cssScope}--padding: .75em;
      color: var(${cssGlobalVars.foreground});
      background: var(${cssScope}--background);
      display: block;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 0.25em;
      transition: box-shadow .1s ease-in-out;
    }
    
    :host([shadow="hover"]:hover),
    :host([shadow="always"]) {
      ${cssScope}--shadow-color: var(${cssScope}--divider-background);
      box-shadow: inset 0 0 0px var(${cssScope}--shadow-width) var(${cssScope}--shadow-color);
    }

   [part="divider"] {
      margin: auto;
      width: var(${cssScope}--divider-width);
      height: var(${cssScope}--divider-height);
      background: var(${cssScope}--divider-background);
    }

    slot {
      display: block;
      padding: var(${cssScope}--padding);
    }
  `,
)
class Card extends GlobalStyle {
  @property({ reflect: true })
  shadow: "none" | "always" | "hover" = "hover";

  @property({ type: Boolean })
  footer = false;
  @property({ type: Boolean })
  header = false;

  protected render() {
    const hr = html`<hr part="divider">`;
    return [
      this.header ? [htmlSlot("header"), hr] : "",
      htmlSlot(),
      this.footer ? [hr, htmlSlot("footer")] : "",
    ];
  }
}

export default Card;

import { attr, godown, htmlSlot, StyleController, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../../internal/global-style.js";

const protoName = "flex";

/**
 * {@linkcode Flex} provides flex layout.
 *
 * @slot - Flex items.
 * @category layout
 */
@godown(protoName)
@styles(css`
  :host,
  :host([contents]) [part="root"] {
    display: flex;
  }

  [part="root"] {
    display: contents;
  }
`)
class Flex extends GlobalStyle {
  /**
   * CSS property `flex-flow` (`flex-direction flex-wrap`).
   */
  @property({ attribute: "flex-flow" })
  flexFlow: string;

  /**
   * CSS property `gap`.
   */
  @property()
  gap: string;

  /**
   * CSS property `justify-content`.
   */
  @property()
  content: string;

  /**
   * CSS property `align-items`.
   */
  @property()
  items: string;

  /**
   * If true, set flex-direction to "column".
   */
  @property({ type: Boolean })
  vertical = false;

  constructor() {
    super();
    new StyleController(
      this,
      () => ({
        ":host": {
          gap: this.gap,
          "flex-flow": this.flexFlow,
          "flex-direction": this.vertical && "column",
          "align-items": this.items,
          "justify-content": this.content,
        },
      }),
      () => [this.gap, this.flexFlow, this.vertical, this.items, this.content],
    );
  }

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${htmlSlot()}
      </div>
    `;
  }
}

export default Flex;
export { Flex };

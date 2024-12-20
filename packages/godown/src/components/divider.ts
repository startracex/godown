import { attr, godown, styles } from "@godown/element";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "divider";

/**
 * {@linkcode Divider} similar to `<hr>`.
 *
 * @category layout
 */
@godown(protoName)
@styles(
  css`
    :host {
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

    :host([contents]) [part=root] {
      width: 100%;
      height: .05em;
      margin: auto;
      display: block;
      background: currentColor;
    }

    [part=root] { 
      display: contents;
    }
  `,
)
class Divider extends GlobalStyle {
  /**
   * Vertical display.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  protected render(): TemplateResult<1> {
    return html`<div part="root" ${attr(this.observedRecord)}></div>`;
  }
}

export default Divider;
export { Divider };

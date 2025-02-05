import { attr, godown, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle } from "../core/global-style.js";

const protoName = "divider";

/**
 * {@linkcode Divider} similar to `<hr>`.
 *
 * @category layout
 */
@godown(protoName)
@styles(css`
  :host {
    width: 100%;
    height: 0.05em;
    display: block;
    background: currentColor;
    color: var(${cssGlobalVars.passive});
  }

  :host([vertical]) {
    width: 0.05em;
    height: 100%;
  }

  :host([contents]) [part="root"] {
    width: 100%;
    height: 0.05em;
    margin: auto;
    display: block;
    background: currentColor;
  }

  [part="root"] {
    display: contents;
  }
`)
class Divider extends GlobalStyle {
  /**
   * Whether to display the divider vertically.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      ></div>
    `;
  }
}

export default Divider;
export { Divider };

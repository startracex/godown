import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, scopePrefix } from "../../internal/global-style.js";

const protoName = "alert";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Alert} renders a alert.
 *
 * Color defaults to blue.
 *
 * @slot - Alert content.
 * @slot title - Alert title.
 * @slot icon - Alert icon.
 * @fires close - Fires when the alert is closed.
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host {
    padding: 0.75em;
    background: var(${cssScope}--background);
    border-color: var(${cssScope}--border-color, currentColor);
    border-style: solid;
  }

  :host,
  :where(:host([contents]) [part="root"]) {
    display: block;
  }

  [part="root"] {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr;
  }

  [part="content"] {
    display: grid;
  }
`)
class Alert extends GlobalStyle {

  /**
   * The title is bold and the icon height is the same as it.
   */
  @property()
  title: string;

  /**
   * Content, if zero value, will be rendered as an unnamed slot.
   */
  @property()
  content: string;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        <div class="start">${htmlSlot("start")}</div>
        <div part="content">
          <strong part="title">${this.title || htmlSlot("title")}</strong>
          ${this.content || htmlSlot()}
        </div>
        <div class="end">${htmlSlot("end")}</div>
      </div>
    `;
  }

  static alert(root: HTMLElement, option: Partial<Alert>): Alert {
    const ai = new this();
    Object.assign(ai, option);
    root.appendChild(ai);
    return ai;
  }
}

export default Alert;
export { Alert };

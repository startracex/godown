import { attr, godown, htmlSlot, StyleController, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle } from "../../internal/global-style.js";
import { RingBuilder, ringTypeAttribute, type RingType } from "../../internal/ring.js";

const protoName = "alert";

/**
 * {@linkcode Alert} renders a alert.
 *
 * @slot - Alert content.
 * @slot title - Alert title.
 * @slot prefix - Alert prefix.
 * @slot suffix - Alert suffix.
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host {
    background: var(${cssGlobalVars.background});
    color: var(${cssGlobalVars.foreground});
  }

  :host,
  :where(:host([contents]) [part="root"]),
  b {
    display: block;
  }

  [part="root"] {
    padding: 1em;
    display: grid;
    grid-template-columns: auto 1fr auto;
  }
`)
class Alert extends GlobalStyle {
  constructor() {
    super();
    new StyleController(this, () => new RingBuilder({ type: this.ringType }).css);
  }

  @property({ attribute: ringTypeAttribute })
  ringType: RingType = "border";

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
      <div part="root">
        <div>${htmlSlot("prefix")}</div>
        <div part="content">
          <b part="title">${htmlSlot("title", this.title)}</b>
          ${htmlSlot("", this.content)}
        </div>
        <div>${htmlSlot("suffix")}</div>
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

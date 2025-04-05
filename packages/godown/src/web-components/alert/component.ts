import { attr, godown, htmlSlot, joinRules, StyleController, styles, toVar } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../../internal/global-style.js";

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
    color: var(${cssGlobalVars.foreground});
    background: var(${cssGlobalVars.background});
    ${cssScope}--border-width: .075em;
    ${cssScope}--blockquote-width: .2em;
    ${cssScope}--blockquote-background: transparent;
    ${cssScope}--gap: .5em;
  }

  :host,
  :where(:host([contents]) [part="root"]) {
    display: block;
  }

  [part="root"] {
    color: var(${cssScope}--color, currentColor);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr;
    border-radius: inherit;
    border-style: solid;
    border-width: var(${cssScope}--border-width);
    padding: var(${cssScope}--gap);
    background: var(${cssScope}--background);
    border-color: var(${cssScope}--border-color, currentColor);
  }

  [variant="blockquote"] {
    border-radius: 0;
    border-width: 0;
    border-left-width: var(${cssScope}--blockquote-width);
    background: var(${cssScope}--blockquote-background);
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

  /**
   * Alert variant, if set to `blockquote`, the alert will be rendered as a blockquote,
   * otherwise it will be rendered as a normal alert.
   */
  @property()
  variant: "blockquote" | "dark" = "dark";

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

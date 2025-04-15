import { godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars } from "../../internal/global-style.js";

const protoName = "text";

/**
 * {@linkcode Text} renders text.
 *
 * @category display
 */
@godown(protoName)
@styles(css`
  :host([clip]) {
    background: var(${cssGlobalVars.backgroundClip});
    display: inline-block;
    color: transparent;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }

  :host([nowrap]) {
    white-space: nowrap;
  }

  :host([italic]) {
    font-style: italic;
  }

  :host([truncate]),
  :host([truncate]) ::slotted(*) {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([strikethrough]) {
    text-decoration: line-through;
  }

  :host([underline=""]),
  :host([underline="always"]),
  :host(:hover[underline="hover"]),
  :host(:active[underline="active"]),
  :host(:focus[underline="focus"]) {
    text-decoration: underline;
  }
`)
class Text extends GlobalStyle {
  @property({
    converter: {
      fromAttribute(value) {
        return value === "" ? true : value;
      },
      toAttribute(value) {
        return value === false ? null : value === true ? "" : value;
      },
    },
    reflect: true,
  })
  underline: "none" | "hover" | "active" | "always" | boolean = "none";

  @property({ type: Boolean, reflect: true })
  nowrap = false;

  @property({ type: Boolean, reflect: true })
  italic = false;

  @property({ type: Boolean, reflect: true })
  truncate = false;

  @property({ type: Boolean, reflect: true })
  clip = false;

  protected render(): TemplateResult<1> {
    return html`
      <p part="root">${htmlSlot()}</p>
    `;
  }
}

export default Text;
export { Text };

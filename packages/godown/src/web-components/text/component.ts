import { attr, tokenList, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";

const protoName = "text";

const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Text} renders nowrap text.
 *
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--color: currentColor;
    ${cssScope}--color-hover: currentColor;
    ${cssScope}--color-active: currentColor;
    display: inline-block;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
  }

  [part="root"] {
    white-space: nowrap;
    vertical-align: bottom;
    display: inline-block;
    text-overflow: inherit;
    overflow-wrap: inherit;
    overflow: hidden;
    color: var(${cssScope}--color);
  }

  [part="root"]:hover {
    color: var(${cssScope}--color-hover, var(${cssScope}--color));
  }

  [part="root"]:active {
    color: var(${cssScope}--color-active, var(${cssScope}--color));
  }

  .hover:hover,
  .active:active,
  .always {
    text-decoration: underline;
  }

  .none {
    text-decoration: none;
  }

  [clip] {
    background: var(${cssGlobalVars.clipBackground});
    display: inline-block;
    color: transparent;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
`)
class Text extends GlobalStyle {
  /**
   * Underline behavior.
   */
  @property()
  underline: "none" | "hover" | "active" | "always" = "none";

  /**
   * Set background-clip to text.
   */
  @property({ type: Boolean })
  clip = false;

  protected render(): TemplateResult<1> {
    return html`
      <span
        part="root"
        ${attr(this.observedRecord)}
        class="${tokenList(this.underline)}"
      >
        ${htmlSlot()}
      </span>
    `;
  }
}

export default Text;
export { Text };

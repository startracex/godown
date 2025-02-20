import { attr, godown, htmlSlot, omit, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars } from "../core/global-style.js";

const protoName = "avatar";

/**
 * {@linkcode Avatar} renders a avatar.
 *
 * Renders as an image if it has a src property,
 * otherwise falls back to name or nameless slot.
 *
 * @slot - Display content if no `src` or `name` provided.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    background: var(${cssGlobalVars.passive});
    vertical-align: bottom;
    overflow: hidden;
    width: 2em;
    height: 2em;
  }

  :host,
  [part="root"] {
    display: inline-flex;
  }

  :host([contents]) [part="root"] {
    display: inline-flex;
    width: inherit;
    height: inherit;
  }

  :host([round]) {
    border-radius: 50%;
  }

  [part="image"] {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  [part="root"] {
    position: relative;
    border-radius: inherit;
    align-items: center;
    justify-content: center;
  }
`)
class Avatar extends GlobalStyle {
  /**
   * The `src` property specifies the URL of the avatar image.
   * If `src` is not provided, the component will display the `name` property instead.
   */
  @property()
  src: string | undefined | null;

  /**
   * Specifies the name or initials to display if no `src` is provided
   */
  @property()
  name = "";

  /**
   * If `true`, will make the avatar display as a circle.
   */
  @property({ type: Boolean })
  round = false;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(omit(this.observedRecord, "src"))}
      >
        ${this._renderAvatar()}
      </div>
    `;
  }

  protected _renderAvatar(): TemplateResult<1> {
    if (this.src) {
      return html`
        <img
          part="image"
          src="${this.src}"
          alt="${this.name}"
          @error=${this._handleError}
        />
      `;
    }
    if (this.name) {
      return html`
        <span part="name">${this.formatName()}</span>
      `;
    }
    return htmlSlot();
  }

  formatName(): string {
    return this.name;
  }

  protected _handleError(): void {
    this.src = undefined;
  }
}

export default Avatar;
export { Avatar };

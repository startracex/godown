import { attr, godown, htmlSlot, omit, styles } from "@godown/element";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, scopePrefix } from "../core/global-style.js";

const protoName = "avatar";
const cssScope = scopePrefix(protoName);

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
    ${cssScope}--size: 2em;
    width: var(${cssScope}--size);
    height: var(${cssScope}--size);
    vertical-align: bottom;
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
    overflow: hidden;
    position: relative;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`)
class Avatar extends GlobalStyle {
  /**
   * Image src.
   */
  @property()
  src: string | undefined | null;

  /**
   * If the image is not available, display name (call {@linkcode Avatar.format}).
   */
  @property()
  name = "";

  /**
   * Display rounded.
   */
  @property({ type: Boolean })
  round = false;

  protected render(): TemplateResult<1> {
    return html`<div part="root" ${attr(omit(this.observedRecord, "src"))}>${this._renderAvatar()}</div>`;
  }

  private _renderAvatar() {
    if (this.src) {
      return html`<img part="image" src="${this.src}" @error=${this._handleError} alt="${this.name}" />`;
    }
    if (this.name) {
      return html`<span part="name">${this.format()}</span>`;
    }
    return htmlSlot();
  }

  format(): string {
    return this.name;
  }

  _handleError(): void {
    this.src = undefined;
  }
}

export default Avatar;
export { Avatar };

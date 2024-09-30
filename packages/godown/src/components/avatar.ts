import { godown, styles } from "@godown/element/decorators/index.js";
import { htmlSlot } from "@godown/element/directives/index.js";
import { css, html } from "lit";
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
 * @category display
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--size: 2em;
      width: var(${cssScope}--size);
      height: var(${cssScope}--size);
      display: inline-block;
      vertical-align: bottom;
    }

    :host([round]){
      border-radius:50%;
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
    }

    [part="root"] {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
)
class Avatar extends GlobalStyle {
  /**
   * Image src.
   */
  @property()
  src: string | undefined | null;
  /**
   * If the image is not available, the {@linkcode Avatar.format} will be displayed.
   */
  @property()
  name = "";

  @property({ type: Boolean })
  round = false;

  protected render() {
    return html`<div part="root">${this._renderAvatar()}</div>`;
  }

  private _renderAvatar() {
    if (this.src) {
      return html`<img part="image" src="${this.src}" @error=${this._handleError} alt="${this.name}">`;
    }
    if (this.name) {
      return html`<span part="name">${this.format()}</span>`;
    }
    return htmlSlot();
  }

  format() {
    return this.name;
  }

  _handleError() {
    this.src = undefined;
  }
}

export default Avatar;

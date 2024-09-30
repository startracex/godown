import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { classList } from "@godown/element/directives/class-list.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../core/global-style.js";

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

    span {
      white-space: nowrap;
      width: 100%;
      vertical-align: bottom;
      display: inline-block;
      text-overflow: inherit;
      overflow-wrap: inherit;
      overflow: hidden;
      color: var(${cssScope}--color);
    }

    span:hover {
      color: var(${cssScope}--color-hover, var(${cssScope}--color));
    }

    span:active {
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

    .clip{
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
  clip: boolean;

  protected render() {
    return html`<span
      part="root"
      class="${
      classList(this.underline, {
        clip: this.clip,
      })
    }"
    >
      ${htmlSlot()}
    </span>`;
  }
}

export default Text;

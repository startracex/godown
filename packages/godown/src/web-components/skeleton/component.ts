import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property, state } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";

const protoName = "skeleton";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Skeleton} renders a skeleton screen.
 *
 * @slot loading - The content if loading is true.
 * @slot - The content if loading is false.
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--from: var(${cssGlobalVars.background});
    ${cssScope}--to: var(${cssGlobalVars.passive});
    ${cssScope}--deg: 95deg;
    ${cssScope}--duration: 2s;
    height: 2em;
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
    background-color: transparent;
    background-size: 200% 100%;
    background-image: linear-gradient(
      var(${cssScope}--deg),
      var(${cssScope}--from) 36%,
      var(${cssScope}--to) 50%,
      var(${cssScope}--from) 64%
    );
    animation: _ var(${cssScope}--duration) ease-in-out infinite none running;
  }

  @keyframes _ {
    from {
      background-position: 150% center;
    }
    to {
      background-position: -50% center;
    }
  }

  [part="root"] {
    display: contents;
  }

  :host,
  :host([contents]) [part="root"] {
    display: block;
  }
`)
class Skeleton extends GlobalStyle {
  /**
   * If false, render slot only.
   */
  @state()
  loading = true;

  protected render(): TemplateResult<1> {
    if (!this.loading) {
      return htmlSlot();
    }
    return html`
      <div part="root">${htmlSlot("loading")}</div>
    `;
  }
}

export default Skeleton;
export { Skeleton };

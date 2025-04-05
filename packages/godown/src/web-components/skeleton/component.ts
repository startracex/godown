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
    ${cssScope}--icon-size: 5em;
    ${cssScope}--icon-margin: .25em;
    background: var(${cssScope}--from);
    min-height: 1.5em;
    width: 100%;
    flex-shrink: 0;
    display: block;
    overflow: hidden;
  }

  [part="root"] {
    min-height: inherit;
    text-align: center;
    animation: var(${cssScope}--duration) ease-in-out infinite none running;
  }

  [animation="position"] {
    background-image: linear-gradient(
      var(${cssScope}--deg),
      var(${cssScope}--from) 36%,
      var(${cssScope}--to) 50%,
      var(${cssScope}--from) 64%
    );
    background-color: transparent;
    background-size: 200% 100%;
    animation-name: po;
  }

  @keyframes po {
    from {
      background-position: 150% center;
    }
    to {
      background-position: -50% center;
    }
  }

  [animation="opacity"] {
    animation-name: op;
    animation-direction: alternate;
  }

  @keyframes op {
    0% {
      background: var(${cssScope}--from);
    }
    to {
      background: var(${cssScope}--to);
    }
  }
`)
class Skeleton extends GlobalStyle {
  /**
   * If "image", render a image placeholder.
   */
  @property()
  type: "text" | "image";

  /**
   * Animation type.
   * opacity animation only effect on slotted element and image icon.
   */
  @property()
  animation: "position" | "opacity" = "position";

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
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${htmlSlot("loading")}
      </div>
    `;
  }
}

export default Skeleton;
export { Skeleton };

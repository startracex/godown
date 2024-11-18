import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import iconPhoto from "@godown/f7-icon/icons/photo.js";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../core/global-style.js";

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
@styles(
  css`
    :host {
      ${cssScope}--from: var(${cssGlobalVars._colors.darkgray[9]});
      ${cssScope}--to: var(${cssGlobalVars._colors.darkgray[7]});
      ${cssScope}--deg: 95deg;
      ${cssScope}--duration: 1.5s;
      ${cssScope}--icon-size: 5em;
      ${cssScope}--icon-margin: .25em;
      color: var(${cssGlobalVars._colors.darkgray[5]});
      background: var(${cssScope}--from);
      min-height: 1.5em;
      width: 100%;
      flex-shrink: 0;
      display: block;
      overflow: hidden;
    }

    [part="root"] {
      height: 100%;
      min-height: inherit;
      text-align: center;
      animation: var(${cssScope}--duration) ease-in-out 0s infinite none running;
    }

    svg {
      --size:var(${cssScope}--icon-size);
      font-size: var(--size);
      margin: calc(var(--size) * 0.05);
    }

    .position {
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

    .opacity {
      animation-name: op;
      animation-direction: alternate;
    }

    @keyframes op {
      50% {
        opacity: 0.25;
      }
      to {
        opacity: 1;
      }
    }
  `,
)
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

  protected render() {
    if (!this.loading) {
      return htmlSlot();
    }
    return html`<div part="root" class="${this.animation}">
    ${this.type === "image" ? iconPhoto() : ""}
    ${htmlSlot("loading")}</div>`;
  }
}

export default Skeleton;

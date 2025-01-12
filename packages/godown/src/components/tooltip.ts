import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { scopePrefix } from "../core/global-style.js";
import SuperOpenable, { type Direction8 } from "../core/super-openable.js";

const protoName = "tooltip";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Tooltip} provide tooltip for slot elements.
 *
 * If it has the tip property, ignore the slot tip.
 *
 * @slot tip - Tip element if no `tip` provided.
 * @slot - Content.
 * @category feedback
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--tip-background: inherit;
      width: fit-content;
    }

    :host,
    [part="root"] {
      display: inline-flex;
    }

    [part="root"] {
      position: relative;
      transition: inherit;
      border-radius: inherit;
    }

    [part="tip"] {
      width: fit-content;
      height: fit-content;
      position: absolute;
      visibility: hidden;
      transition: inherit;
      user-select: none;
    }

    :host([open]) [part="tip"] {
      visibility: visible;
    }

    .passive {
      background: var(${cssScope}--tip-background);
    }

    [propagation] [part="tip"] {
      pointer-events: none;
    }
  `,
  css`
    [direction^="top"] [part="tip"] {
      bottom: 100%;
    }

    [direction^="bottom"] [part="tip"] {
      top: 100%;
    }

    [direction$="right"] [part="tip"] {
      left: 100%;
    }

    [direction$="left"] [part="tip"] {
      right: 100%;
    }
  `,
)
class Tooltip extends SuperOpenable {
  /**
   * Tip text, if there is a value, the slot will be ignored.
   */
  @property()
  tip: string;

  /**
   * Direction of opening the tip.
   */
  @property()
  direction: Direction8 = "top";

  /**
   * Content alignment.
   */
  @property()
  align: "center" | "flex-start" | "flex-end" | "start" | "end" = "center";

  /**
   * If true, allow penetration of the tip.
   */
  @property({ type: Boolean })
  propagation = false;

  /**
   * How can tips be triggered.
   *
   * If `focus`, element will be focusable, open tip when focused.
   *
   * If `hover`, element will open tip when hovered.
   *
   * @default "hover"
   */
  @property()
  type: "hover" | "focus" = "hover";

  static aligns = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    "flex-start": "flex-start",
    "flex-end": "flex-end",
  };

  protected render(): TemplateResult<1> {
    const align = Tooltip.aligns[this.align] || "inherit";
    const isFocusable = this.type === "focus";
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        tabindex="${isFocusable ? 0 : -1}"
        @focus="${isFocusable ? () => (this.open = true) : null}"
        @blur="${isFocusable ? () => (this.open = false) : null}"
        @mouseenter="${isFocusable ? null : () => (this.open = true)}"
        @mouseleave="${isFocusable ? null : () => (this.open = false)}"
        style="justify-content:${align};align-items:${align}"
      >
        ${htmlSlot()}
        <div part="tip">
          ${this.tip
            ? html`
                <span class="passive">${this.tip}</span>
              `
            : htmlSlot("tip")}
        </div>
      </div>
    `;
  }
}

export default Tooltip;
export { Tooltip };

import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import SuperOpenable, { type Direction8 } from "../core/super-openable.js";

const protoName = "tooltip";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Tooltip} provide tooltip for slot elements.
 *
 * If it has the tip property, ignore the slot tip.
 *
 * @slot tip - Tip element.
 * @slot - Content.
 * @category feedback
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--tip-background: inherit;
      display: inline-block;
      width: fit-content;
    }

    [part="root"] {
      display: flex;
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

    :host([open]) [part="tip"],
    :host(:hover) [part="tip"],
    [part="tip"]:hover {
      visibility: visible;
    }

    .passive{
      background: var(${cssScope}--tip-background);
      padding: 0 .5em;
    }
  `,
  css`
    [direction^="top"] {
      bottom: 100%;
    }
    [direction^="bottom"] {
      top: 100%;
    }
    [direction$="right"] {
      left: 100%;
    }
    [direction$="left"] {
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
  propagation: boolean;

  static aligns = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    "flex-start": "flex-start",
    "flex-end": "flex-end",
  };

  protected render() {
    const align = Tooltip.aligns[this.align] || "inherit";
    return html`<div part="root" style="justify-content:${align};align-items:${align}">
      ${htmlSlot()}
      <div part="tip" direction="${this.direction}" style="pointer-events:${this.propagation ? "none" : "all"}">
    ${
      this.tip
        ? html`<span class="passive">${this.tip}</span>`
        : htmlSlot("tip")
    }</div>
    </div>`;
  }
}

export default Tooltip;

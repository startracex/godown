import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";
import type { DirectionCorner } from "../../internal/direction.js";

const protoName = "chip";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Chip} renders a chip.
 *
 * @slot - Chip content.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--offset: 0%;
    ${cssScope}--offset-x: var(${cssScope}--offset);
    ${cssScope}--offset-y: var(${cssScope}--offset);
  }

  :host,
  :host([contents]) [part="root"] {
    display: inline-block;
  }

  [part="root"] {
    position: relative;
  }

  [part="chip"] {
    position: absolute;
    font-size: 75%;
    padding: 0 0.5em;
    user-select: none;
    border-radius: calc(infinity * 1px);
    transform: translate(-50%, -50%);
    color: var(${cssGlobalVars.primaryForeground});
    background: var(${cssGlobalVars.primaryBackground});
  }

  [part="chip"]:empty {
    width: 0.5em;
    height: 0.5em;
    font-size: 100%;
    padding: 0;
    border-radius: 50%;
  }

  [position^="top"] [part="chip"] {
    top: calc(0% + var(${cssScope}--offset-y));
  }

  [position$="right"] [part="chip"] {
    left: calc(100% - var(${cssScope}--offset-x));
  }

  [position^="bottom"] [part="chip"] {
    top: calc(100% - var(${cssScope}--offset-y));
  }

  [position$="left"] [part="chip"] {
    left: calc(0% + var(${cssScope}--offset-x));
  }
`)
class Chip extends GlobalStyle {
  /**
   * The position of the chip relative to its parent element.
   * Possible values are `"top-left"`, `"top-right"`, `"bottom-left"`, and `"bottom-right"`.
   */
  @property()
  position: DirectionCorner = "top-right";

  @property({ type: Number })
  value = 0;

  /**
   * If `true`, render a dot chip.
   */
  @property({ type: Boolean })
  dot = false;

  /**
   * The maximum value that can be displayed in the chip
   * Values greater than this will be displayed as `max+` by default.
   */
  @property({ type: Number })
  max = 99;

  formatValue(value: number): string {
    return value > this.max ? this.max + "+" : value + "";
  }

  render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${htmlSlot()}
        ${this.value || this.dot
          ? html`
              <div part="chip">${this.dot ? "" : this.formatValue(this.value)}</div>
            `
          : ""}
      </div>
    `;
  }
}

export default Chip;
export { Chip };

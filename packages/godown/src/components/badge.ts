import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../core/global-style.js";

const protoName = "badge";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Badge} renders a badge.
 *
 * @slot - Badge content.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--background: var(${cssGlobalVars.active});
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

  [part="badge"] {
    position: absolute;
    font-size: 75%;
    padding: 0 0.5em;
    user-select: none;
    border-radius: calc(infinity * 1px);
    transform: translate(-50%, -50%);
    left: var(--left);
    top: var(--top);
    background: var(${cssScope}--background);
  }

  [part="badge"]:empty {
    width: 0.5em;
    height: 0.5em;
    font-size: 100%;
    padding: 0;
    border-radius: 50%;
  }

  [position^="top"] {
    --top: calc(0% + var(${cssScope}--offset-y));
  }

  [position$="right"] {
    --left: calc(100% - var(${cssScope}--offset-x));
  }

  [position^="bottom"] {
    --top: calc(100% - var(${cssScope}--offset-y));
  }

  [position$="left"] {
    --left: calc(0% + var(${cssScope}--offset-x));
  }
`)
class Badge extends GlobalStyle {
  /**
   * The position of the badge relative to its parent element.
   * Possible values are `"top-left"`, `"top-right"`, `"bottom-left"`, and `"bottom-right"`.
   */
  @property()
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" = "top-right";

  @property({ type: Number })
  value = 0;

  /**
   * If `true`, render a dot badge.
   */
  @property({ type: Boolean })
  dot = false;

  /**
   * The maximum value that can be displayed in the badge
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
              <div part="badge">${this.dot ? "" : this.formatValue(this.value)}</div>
            `
          : ""}
      </div>
    `;
  }
}

export default Badge;
export { Badge };

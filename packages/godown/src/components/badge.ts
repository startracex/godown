import { attr, godown, htmlSlot, styles } from "@godown/element";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../core/global-style.js";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";

const protoName = "badge";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Badge} renders a badge.
 *
 * @category display
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--background: var(${cssGlobalVars.active});
      ${cssScope}--offset: 0%;
      ${cssScope}--offset-x: var(${cssScope}--offset);
      ${cssScope}--offset-y: var(${cssScope}--offset);
    }

    :host,
    :host([contents]) [part=root] {
      display: inline-block;
    }

    [part=root] {
      position: relative;
    }

    [part=badge] {
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

    [part=badge]:empty {
      width: 0.5em;
      height: 0.5em;
      font-size: 100%;
      padding: 0;
      border-radius: 50%;
    }

    [position^=top] {
      --top: calc(0% + var(${cssScope}--offset-y));
    }

    [position$=right] {
      --left: calc(100% - var(${cssScope}--offset-x));
    }

    [position^=bottom] {
      --top: calc(100% - var(${cssScope}--offset-y));
    }

    [position$=left] {
      --left: calc(0% + var(${cssScope}--offset-x));
    }
  `,
)
class Badge extends GlobalStyle {
  @property({ type: String })
  position: Position = "top-right";

  @property({ type: Number })
  value = 0;

  @property({ type: Boolean })
  dot = false;

  @property({ type: Number })
  max = 99;

  private formatValue(value: number): string {
    return value > this.max ? this.max + "+" : value + "";
  }

  render(): TemplateResult<1> {
    if (this.value === 0 && !this.dot) {
      return htmlSlot();
    }
    return html`<div part="root" ${attr(this.observedRecord)}>
      ${htmlSlot()}
      <div part="badge">${this.dot ? "" : this.formatValue(this.value)}</div>
    </div>`;
  }
}

export default Badge;
export { Badge };

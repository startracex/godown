import { attr, godown, htmlSlot, htmlStyle, isNumerical, joinRules, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../../internal/global-style.js";

const toTemplate = (s: number | string) => (isNumerical(s) ? `repeat(${s},1fr)` : s);

const protoName = "grid";

/**
 * {@linkcode Grid} provides gird layout.
 *
 * @slot - Grid items.
 * @category layout
 */
@godown(protoName)
@styles(css`
  :host,
  :host([contents]) [part="root"] {
    display: grid;
  }

  [part="root"] {
    display: contents;
  }
`)
class Grid extends GlobalStyle {
  /**
   * CSS property `gap`.
   */
  @property()
  gap: string;

  /**
   * CSS property `grid-template-columns`.
   *
   * If columns is numerical, divide columns equally.
   */
  @property()
  columns: string | number;

  /**
   * CSS property `grid-template-rows`.
   *
   * If rows is numerical, divide rows equally.
   */
  @property()
  rows: string | number;

  /**
   * CSS property `place-content` (`align-content justify-content`).
   */
  @property()
  content: string;

  /**
   * CSS property `place-items` (`align-items justify-items`).
   */
  @property()
  items: string;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${[
          htmlSlot(),
          htmlStyle(
            joinRules({
              ":host": {
                gap: this.gap,
                "grid-template-columns": toTemplate(this.columns),
                "grid-template-rows": toTemplate(this.rows),
                "place-content": this.content,
                "place-items": this.items,
              },
            }),
          ),
        ]}
      </div>
    `;
  }
}

export default Grid;
export { Grid };

import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { htmlStyle } from "@godown/element/directives/html-style.js";
import { joinRules } from "@godown/element/tools/css.js";
import { isNumerical } from "@godown/element/tools/lib.js";
import { css } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "grid";

/**
 * {@linkcode Grid} provides gird layout.
 *
 * @category layout
 */
@godown(protoName)
@styles(css`:host{display:grid;}`)
class Grid extends GlobalStyle {
  /**
   * CSS property `gap`.
   */
  @property()
  gap: string;
  /**
   * CSS property `grid-template-columns`, if {@linkcode isNumerical} divide equally.
   */
  @property()
  columns: string | number;
  /**
   * CSS property `grid-template-rows`, if {@linkcode isNumerical} divide equally.
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

  protected render() {
    return [
      htmlSlot(),
      htmlStyle(
        joinRules({
          ":host": {
            gap: this.gap,
            "grid-template-columns": isNumerical(this.columns) ? `repeat(${this.columns},1fr)` : this.columns,
            "grid-template-rows": isNumerical(this.rows) ? `repeat(${this.rows},1fr)` : this.rows,
            "place-content": this.content,
            "place-items": this.items,
          },
        }),
      ),
    ];
  }
}

export default Grid;

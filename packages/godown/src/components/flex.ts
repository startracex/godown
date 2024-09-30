import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { htmlStyle } from "@godown/element/directives/html-style.js";
import { joinRules } from "@godown/element/tools/css.js";
import { css } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "flex";

/**
 * {@linkcode Flex} provides flex layout.
 *
 * @category layout
 */
@godown(protoName)
@styles(css`:host {display:flex;}`)
class Flex extends GlobalStyle {
  /**
   * CSS property `flex-flow` (`flex-direction flex-wrap`).
   */
  @property({ attribute: "flex-flow" })
  flexFlow: string;
  /**
   * CSS property `gap`.
   */
  @property()
  gap: string;
  /**
   * CSS property `justify-content`.
   */
  @property()
  content: string;
  /**
   * CSS property `align-items`.
   */
  @property()
  items: string;
  /**
   * If true, set flex-direction to "column".
   */
  @property({ type: Boolean })
  vertical: boolean;

  protected render() {
    return [
      htmlSlot(),
      htmlStyle(
        joinRules({
          ":host": {
            gap: this.gap,
            "flex-flow": this.flexFlow,
            "flex-direction": this.vertical && "column",
            "align-items": this.items,
            "justify-content": this.content,
          },
        }),
      ),
    ];
  }
}

export default Flex;

import { godown, htmlSlot } from "@godown/element";
import { type TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";

import Popover from "../popover/component.js";

const protoName = "tooltip";

/**
 * {@linkcode Tooltip} is similar to {@linkcode Popover}.
 *
 * It listens for the mouseenter event and displays the tip or popover after a specified delay.
 *
 * When it is clicked or the mouseleave event occurs followed by another delay, closes the tip.
 *
 * @fires toggle - Fired when the popover is toggled.
 * @slot tip - Tip content.
 * @slot - Tip trigger.
 * @category feedback
 */
@godown(protoName)
class Tooltip extends Popover {
  action: "hide";
  span: "span" | "isolated";

  @property()
  tip: string;

  @property({ type: Number })
  delay = 300;

  protected render(): TemplateResult<1> {
    return html`
      <div part="root">
        <div
          part="trigger"
          @click=${this.hide}
        >
          ${htmlSlot()}
        </div>
        <div
          part="popover"
          popover="manual"
        >
          ${htmlSlot("tip", this.tip)}
        </div>
      </div>
    `;
  }

  _hoverTimeout: number;
  _leaveTimeout: number;

  connectedCallback(): void {
    super.connectedCallback();
    this.events.add(this, "mouseenter", () => {
      clearTimeout(this._leaveTimeout);
      this._hoverTimeout = setTimeout(() => {
        this.show();
      }, this.delay);
    });
    this.events.add(this, "mouseleave", () => {
      clearTimeout(this._hoverTimeout);
      this._leaveTimeout = setTimeout(() => {
        this.hide();
      }, this.delay);
    });
  }
}

export default Tooltip;
export { Tooltip };

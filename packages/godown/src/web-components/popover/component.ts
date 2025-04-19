import { property } from "lit/decorators.js";
import GlobalStyle from "../../internal/global-style.js";
import { css, html, type PropertyValues, type TemplateResult } from "lit";
import { godown, htmlSlot, joinRules, part, StyleController, styles } from "@godown/element";
import { hidePopover, showPopover } from "../../internal/popover.js";

const POPOVER = "popover";
const protoName = POPOVER;

/**
 * {@link Popover} renders a popover.
 *
 * This requires the support of the popover API and CSS position-area.
 *
 * @fires toggle - Fired when the popover is toggled.
 * @slot popover - Popover content.
 * @slot - Popover trigger.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    display: inline-block;
  }

  [part="trigger"] {
    display: contents;
  }

  [part="root"] {
    display: inherit;
  }

  [part="popover"] {
    inset: unset;
    z-index: 1;
    overflow: visible;
    position: absolute;
    position-try-fallbacks: flip-block;
  }
`)
class Popover extends GlobalStyle {
  anchorName = `--${POPOVER}-${Math.random().toString(36).slice(2)}`;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property()
  action: "hide" | "show" | "toggle" | "none" = "show";

  @property()
  span: "span" | "spread" | "isolated" = "span";

  /**
   * The position refers to the spatial location of the popover in relation to the trigger,
   * rather than the alignment property between them.
   */
  @property()
  position:
    | "center"
    | "left"
    | "left-top"
    | "left-bottom"
    | "right"
    | "right-top"
    | "right-bottom"
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "start"
    | "start-start"
    | "start-end"
    | "end"
    | "end-start"
    | "end-end" = "bottom";

  @part(POPOVER)
  protected _popover: HTMLElement;

  constructor() {
    super();
    new StyleController(this, () => {
      return joinRules({
        "[part=root],slot:not([name])::slotted(*)": {
          "anchor-name": this.anchorName,
        },
        "[part=popover]": {
          "position-anchor": this.anchorName,
          "position-area": this.resolveArea(),
        },
      });
    });
  }
  protected render(): TemplateResult<1> {
    return html`
      <div part="root">
        <div
          part="trigger"
          @click=${this._handleClick}
        >
          ${htmlSlot()}
        </div>
        <div
          part="popover"
          popover="manual"
        >
          ${htmlSlot("popover")}
        </div>
      </div>
    `;
  }

  protected _handleClick(): void {
    const { action } = this;
    switch (action) {
      case "show":
      case "hide":
      case "toggle":
        this[action]();
    }
  }

  show(): void {
    this.toggle(true);
  }

  hide(): void {
    this.toggle(false);
  }

  toggle(force?: boolean): void {
    this.open = force ?? !this.open;
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("open")) {
      this._openChange();
    }
  }

  protected _openChange(): void {
    const { open } = this;
    if (open) {
      showPopover.call(this, this._popover);
      const listener = (e) => {
        if (!this.contains(e.target)) {
          this.events.remove(document, "click", listener);
          this.open = false;
        }
      };
      this.events.add(document, "click", listener);
    } else {
      hidePopover(this._popover);
    }
    this.dispatchCustomEvent("toggle", open);
  }

  resolveArea(): string {
    const split = this.position.split("-");
    const firstValue = this.span === "spread" ? `span-${split[0]}` : split[0];
    if (split.length < 2) {
      return `${firstValue} center`;
    }
    const secondValue = this.span === "isolated" ? split[1] : `span-${split[1]}`;
    return `${firstValue} ${secondValue}`;
  }
}

export { Popover, Popover as default };

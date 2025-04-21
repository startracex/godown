import { attr, godown, htmlSlot, queryPart, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";

const protoName = "button";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Button} renders a button.
 *
 * Create modal animation upon clicking.
 *
 * @slot - The content of the button.
 * @category input
 */
@godown(protoName)
@styles(
  css`
    :host(:not([disabled]):active) {
      transform: scale(var(${cssScope}--focus-scale));
    }

    :host([round]) {
      border-radius: calc(infinity * 1px);
    }

    :host([disabled]) {
      cursor: not-allowed;
      filter: brightness(0.85);
    }

    :host([plain]) {
      ${cssScope}--gradients: unset;
      ${cssScope}--focus-scale: unset;
    }
  `,
  css`
    :host {
      ${cssScope}--modal-animation-duration: 1.5s;
      ${cssScope}--focus-scale: .97;
      ${cssScope}--deg: 45deg;
      color: var(${cssGlobalVars.primaryForeground});
      background: var(${cssGlobalVars.primaryBackground});
      display: inline-block;
      overflow: hidden;
      text-align: center;
      cursor: pointer;
    }

    [part="root"] {
      padding-block: 0.25em;
      padding-inline: 1em;
      position: relative;
      user-select: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    i {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      visibility: visible;
      pointer-events: none;
      transform-origin: 0 0;
      background: currentColor;
    }
  `,
)
class Button extends GlobalStyle {
  /**
   * If true, remove gradient, modal animation, focus scale.
   */
  @property({ type: Boolean, reflect: true })
  plain = false;

  /**
   * Whether this element is disabled or not.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether this element is active or not.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Display rounded.
   */
  @property({ type: Boolean, reflect: true })
  round = false;

  /**
   * Content text.
   */
  @property()
  content: string;

  @queryPart("modal-root")
  protected _modalRoot: HTMLElement;
  @queryPart("root")
  protected _root: HTMLElement;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${htmlSlot("", this.content)}
        <span part="modal-root"></span>
      </div>
    `;
  }

  focus(): void {
    if (this.disabled) {
      return;
    }
    this.active = true;
    super.focus();
  }

  blur(): void {
    this.active = false;
    super.blur();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.events.add(this, "click", this._handelClick);
  }

  protected _handelClick(e: MouseEvent): void {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (!this.plain) {
      this._handleModal(e);
    }
  }

  protected _handleModal(e: MouseEvent): void {
    const modal = document.createElement("i");
    const { width, height } = this.getBoundingClientRect();
    const { x, y } = this._root.getBoundingClientRect();
    const size = `${Math.sqrt(height ** 2 + width ** 2) * 2}px`;
    modal.style.height = size;
    modal.style.width = size;
    modal.style.left = `${e.x - x}px`;
    modal.style.top = `${e.y - y}px`;
    this._modalRoot.appendChild(modal);
    const keyframes = [
      {
        transform: "scale(0) translate(-50%, -50%)",
        opacity: 0.1,
      },
      {
        transform: "scale(1) translate(-50%, -50%)",
        offset: 0.8,
      },
      {
        opacity: 0,
      },
    ];
    modal.animate(keyframes, {
      duration: 800,
      iterations: 1,
    });
    modal.addEventListener("animationend", () => modal.remove(), { once: true });
  }
}

export default Button;
export { Button };

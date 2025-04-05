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
 * Available colors (background): none, black, gray, white, blue, green, red, orange, pink, purple, yellow, teal.
 *
 * Default color is `black`.
 *
 * Set the color to `none` to prevent applying styles.
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
      background: linear-gradient(
        var(${cssScope}--deg),
        var(${cssScope}--background, var(${cssGlobalVars.background})),
        var(${cssScope}--gradients, var(${cssScope}--background, var(${cssGlobalVars.background})))
      );
      padding: 0.25em 0.75em;
      border-width: var(${cssGlobalVars.ringWidth});
      border-style: none;
      width: fit-content;
      display: block;
      overflow: hidden;
      text-align: center;
      cursor: pointer;
    }

    [part="root"]:not([contents]) {
      height: 100%;
      width: 100%;
    }

    [part="root"] {
      position: relative;
      user-select: none;
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
      background: var(${cssScope}--modal-background, currentColor);
      animation-duration: var(${cssScope}--modal-animation-duration);
    }

    @keyframes kf {
      0% {
        transform: scale(0) translate(-50%, -50%);
        opacity: var(${cssScope}--modal-opacity, 0.1);
      }
      80% {
        transform: scale(1) translate(-50%, -50%);
      }
      to {
        opacity: 0;
      }
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
        ${this.content || htmlSlot()}
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
    this.events.add(this, "click", this._handelClick, true);
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
    modal.style.animationName = "kf";
    this._modalRoot.appendChild(modal);
    modal.addEventListener("animationend", () => modal.remove(), { once: true });
  }
}

export default Button;
export { Button };

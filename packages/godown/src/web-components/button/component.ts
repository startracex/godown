import { attr, godown, htmlSlot, joinRules, part, StyleController, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../../internal/global-style.js";

const protoName = "button";
const cssScope = scopePrefix(protoName);

const whiteFont = cssGlobalVars.white;
const blackFont = cssGlobalVars.black;

type Colors =
  | "none"
  | "teal"
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "orange"
  | "yellow"
  | "pink"
  | "gray"
  | "white"
  | "black";

const colorDetails = {
  black: [
    whiteFont, // color
    cssGlobalVars._colors.darkgray[7], // background
    cssGlobalVars._colors.darkgray[5], // gradients
  ],
  gray: [
    whiteFont, // color
    cssGlobalVars._colors.darkgray[1], // background
    cssGlobalVars._colors.lightgray[8], // gradients
  ],
  white: [
    blackFont, // color
    cssGlobalVars._colors.lightgray[3], // background
    cssGlobalVars._colors.lightgray[0], // gradients
  ],
  blue: [
    whiteFont, // color
    cssGlobalVars._colors.blue[6], // background
    cssGlobalVars._colors.blue[4], // gradients
  ],
  green: [
    whiteFont, // color
    cssGlobalVars._colors.green[6], // background
    cssGlobalVars._colors.green[4], // gradients
  ],
  red: [
    whiteFont, // color
    cssGlobalVars._colors.red[6], // background
    cssGlobalVars._colors.red[4], // gradients
  ],
  orange: [
    whiteFont, // color
    cssGlobalVars._colors.orange[6], // background
    cssGlobalVars._colors.orange[4], // gradients
  ],
  pink: [
    whiteFont, // color
    cssGlobalVars._colors.pink[6], // background
    cssGlobalVars._colors.pink[4], // gradients
  ],
  purple: [
    whiteFont, // color
    cssGlobalVars._colors.purple[6], // background
    cssGlobalVars._colors.purple[4], // gradients
  ],
  yellow: [
    blackFont, // color
    cssGlobalVars._colors.yellow[6], // background
    cssGlobalVars._colors.yellow[4], // gradients
  ],
  teal: [
    whiteFont, // color
    cssGlobalVars._colors.teal[6], // background
    cssGlobalVars._colors.teal[4], // gradients
  ],
};

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

    :host([ghost]) {
      ${cssScope}--modal-background: var(${cssScope}--ghost-color);
      box-shadow: inset 0px 0px 0px var(${cssScope}--ghost-width) var(${cssScope}--ghost-color);
      color: var(${cssScope}--ghost-color);
      background: transparent;
    }

    :host([plain]) {
      ${cssScope}--gradients: unset;
      ${cssScope}--focus-scale: unset;
    }
  `,
  css`
    :host {
      ${cssScope}--padding-x: .8em;
      ${cssScope}--padding-y: calc(var(${cssScope}--padding-x) / 4);
      ${cssScope}--padding: var(${cssScope}--padding-y) var(${cssScope}--padding-x);
      ${cssScope}--modal-animation-duration: 1s;
      ${cssScope}--ghost-width: .08em;
      ${cssScope}--focus-scale: .97;
      ${cssScope}--deg: 45deg;
      ${cssScope}--ghost-color:var(${cssScope}--background);
      color: var(${cssScope}--color, inherit);
      background: linear-gradient(
        var(${cssScope}--deg),
        var(${cssScope}--background),
        var(${cssScope}--gradients, var(${cssScope}--background))
      );
      padding: var(${cssScope}--padding);
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
      transition: none;
      user-select: none;
      border-radius: inherit;
      transition-duration: inherit;
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
  private __colorSC = new StyleController(this, () => {
    const color = this.nextColor();
    if (color in colorDetails) {
      const [fg, bg, gd] = colorDetails[color];
      return joinRules({
        ":host": [
          [`${cssScope}--color`, `var(${fg})`],
          [`${cssScope}--background`, `var(${bg})`],
          [`${cssScope}--gradients`, `var(${gd})`],
        ],
      });
    }
    return null;
  });

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
   * Whether this element should be rendered as a "ghost" button.
   * A ghost button is a button with a transparent background and a border.
   */
  @property({ type: Boolean, reflect: true })
  ghost = false;

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
   * The primary color.
   */
  @property({ reflect: true })
  color: Colors = "black";

  /**
   * Content text.
   */
  @property()
  content: string;

  @part("modal-root")
  protected _modalRoot: HTMLElement;
  @part("root")
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

  nextColor(): Colors {
    return this.color;
  }
}

export default Button;
export { Button };

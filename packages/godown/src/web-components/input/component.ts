import { attr, godown, styles, StyleController, htmlSlot } from "@godown/element";
import iconEyeSlash from "../../internal/icons/eye-slash.js";
import { type TemplateResult, css, html, nothing } from "lit";
import { property, query } from "lit/decorators.js";

import { cssGlobalVars } from "../../internal/global-style.js";
import { SuperInput } from "../../internal/super-input.js";
import { RingBuilder } from "../../internal/ring.js";

type InputType =
  | "text"
  | "search"
  | "tel"
  | "url"
  | "email"
  | "password"
  | "datetime"
  | "date"
  | "month"
  | "week"
  | "time"
  | "datetime-local"
  | "number"
  | "range"
  | "color"
  | "file"
  | "image";

const protoName = "input";

/**
 * {@linkcode Input} renders a input.
 *
 * @fires input - Fires when the input value changes.
 * @fires change - Fires when the input value changes.
 * @category input
 */
@godown(protoName)
@styles(css`
  :host {
    display: block;
    ${cssGlobalVars.input}-icon-color: hsl(0, 0%, 50%);
  }

  :host(:focus-within),
  :host(:active) {
    ${cssGlobalVars.ringColor}: currentColor;
    ${cssGlobalVars.input}-icon-color: currentColor;
  }

  [part="root"] {
    padding-inline: 0.75em;
    padding-block: 0.5em;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: inherit;
  }

  [part="input"] {
    width: 100%;
    height: 100%;
    flex-grow: 1;
  }

  [part="prefix"],
  [part="suffix"] {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(${cssGlobalVars.input}-icon-color);
  }

  [part="suffix"] slot svg {
    margin-inline-start: 0.25em;
  }

  [part="prefix"] slot svg {
    margin-inline-end: 0.25em;
  }
`)
class Input extends SuperInput {
  @property({ reflect: true })
  type: InputType = "text";

  value: string;

  /**
   * If outline, the outline is always present.
   */
  @property()
  variant: "default" | "outline" = "default";

  @query("[part=input]")
  protected _input: HTMLInputElement;

  constructor() {
    super();
    new StyleController(
      this,
      () =>
        new RingBuilder({ type: this.ringType }).css +
        (this.variant === "outline" ? `:host{${cssGlobalVars.ringColor}:currentColor}` : ""),
    );
  }

  protected render(): TemplateResult<1> {
    return html`
      <label
        part="root"
        ${attr(this.observedRecord)}
      >
        ${[
          this._renderPrefix(),
          html`
            <input
              part="input"
              type="${this.type}"
              .value="${this.value}"
              ?autofocus="${this.autofocus}"
              ?disabled="${this.disabled}"
              autocapitalize="${this.autocapitalize || nothing}"
              autocomplete="${this.autocomplete || nothing}"
              placeholder="${this.placeholder || nothing}"
              @input="${this._handleInput}"
              @change="${this._handleChange}"
            />
          `,
          this._renderSuffix(),
        ]}
      </label>
    `;
  }

  protected _renderSuffix(): TemplateResult<1> {
    const PASSWORD = "password";
    if (this.type === PASSWORD) {
      return html`
        <i
          part="suffix"
          @mousedown="${() => this._changeInputType("text")}"
          @mouseup="${() => this._changeInputType(PASSWORD)}"
          @mouseleave="${() => this._changeInputType(PASSWORD)}"
        >
          ${htmlSlot("suffix", iconEyeSlash())}
        </i>
      `;
    }
    return super._renderSuffix();
  }

  protected _changeInputType(t: typeof this.type): void {
    if (this._input) {
      this._input.type = t;
    }
  }
}

export default Input;
export { Input };

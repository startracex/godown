import { attr, godown, queryPart, styles, htmlSlot, StyleController } from "@godown/element";
import iconEyeSlash from "../../internal/icons/eye-slash.js";
import { type TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars } from "../../internal/global-style.js";
import { SuperInput } from "../../internal/super-input.js";
import { RingBuilder } from "../../internal/ring.js";

const protoName = "input";

/**
 * {@linkcode Input} renders a text input.
 *
 * @fires input - Fires when the input value changes.
 * @fires change - Fires when the input value changes.
 * @category input
 */
@godown(protoName)
@styles(css`
  :host {
    display: block;
    ${cssGlobalVars.input}-space: 0.2em;
    ${cssGlobalVars.input}-control: currentColor;
    ${cssGlobalVars.input}-icon-color: hsl(0, 0%, 50%);
  }

  :host(:focus-within),
  :host(:active) {
    ${cssGlobalVars.ringColor}: var(${cssGlobalVars.active});
    ${cssGlobalVars.input}-icon-color: currentColor;
  }

  [part~="root"] {
    padding: 0.4em 0.5em;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: inherit;
    height: inherit;
  }

  [part="input"] {
    background: none;
    height: 100%;
    flex-grow: 1;
    color: currentColor;
    min-height: 1.5em;
  }

  [part~="icon"] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(${cssGlobalVars.input}-icon-color);
  }

  [part~="prefix"],
  [part~="suffix"] {
    height: 100%;
    display: flex;
  }

  [part~="suffix"][part~="icon"] {
    padding-inline-start: var(${cssGlobalVars.input}-space);
  }

  [part~="prefix"][part~="icon"] {
    padding-inline-end: var(${cssGlobalVars.input}-space);
  }
`)
class Input extends SuperInput {
  type:
    | "text"
    | "search"
    | "tel"
    | "url"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week" = "text";

  value: string;

  /**
   * If outline, the outline is always present.
   */
  @property()
  variant: "default" | "outline" = "default";

  @queryPart("input")
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
          part="suffix icon"
          @mousedown="${() => this._changeInputType("text")}"
          @mouseup="${() => this._changeInputType(PASSWORD)}"
          @mouseleave="${() => this._changeInputType(PASSWORD)}"
        >
          ${iconEyeSlash()}
        </i>
      `;
    }
    return super._renderSuffix();
  }
}

export default Input;
export { Input };

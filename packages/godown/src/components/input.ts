import { attr, tokenList, godown, part, styles, htmlSlot } from "@godown/element";
import iconEyeSlashFill from "@godown/f7-icon/icons/eye-slash-fill.js";
import { type TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars } from "../core/global-style.js";
import { SuperInput } from "../core/super-input.js";

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
    width: var(${cssGlobalVars.input}-width);
    height: var(${cssGlobalVars.input}-height);
    display: block;
  }

  :host(:focus-within),
  .outline {
    ${cssGlobalVars.input}-outline-color: var(${cssGlobalVars.active});
  }
`)
class Input extends SuperInput {
  type: "text" | "search" | "tel" | "url" | "email" | "password" = "text";

  value: string;

  /**
   * If outline, the outline is always present.
   */
  @property()
  variant: "default" | "outline" = "default";

  @part("input")
  protected _input: HTMLInputElement;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        class="${tokenList("input-field", this.variant)}"
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
              id="${this.makeId}"
              @input="${this._handleInput}"
            />
          `,
          this._renderSuffix(),
        ]}
      </div>
    `;
  }

  protected _renderSuffix(): TemplateResult<1> {
    const PASSWORD = "password";
    return html`
      <label
        for=${this.makeId}
        part="suffix"
      >
        ${this.type === PASSWORD
          ? html`
              <i
                part="icon"
                @mousedown="${() => this._changeInputType("text")}"
                @mouseup="${() => this._changeInputType(PASSWORD)}"
                @mouseleave="${() => this._changeInputType(PASSWORD)}"
              >
                ${iconEyeSlashFill()}
              </i>
            `
          : htmlSlot("suffix")}
      </label>
    `;
  }
}

export default Input;
export { Input };

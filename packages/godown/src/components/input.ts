import { godown } from "@godown/element/decorators/godown.js";
import { part } from "@godown/element/decorators/part.js";
import { styles } from "@godown/element/decorators/styles.js";
import { classList } from "@godown/element/directives/class-list.js";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars } from "../core/global-style.js";
import SuperInput from "../core/super-input.js";

const protoName = "input";

/**
 * {@linkcode Input} used for text input.
 *
 * @category input
 */
@godown(protoName)
@styles(
  css`
    :host {
      width: var(${cssGlobalVars.input}-width);
      height: var(${cssGlobalVars.input}-height);
      color: var(${cssGlobalVars.foreground});
      background: var(${cssGlobalVars.input}-background);
      border-radius: var(${cssGlobalVars.input}-radius);
      display: block;
    }

    [part="root"] {
      width: 100%;
      display: flex;
      align-items: center;
      cursor: inherit;
    }

    input {
      height: 100%;
      width: 100%;
      margin: 0;
      color: inherit;
      cursor: inherit;
      border-radius: inherit;
    }
  `,
)
class Input extends SuperInput {
  type: "text" | "search" | "tel" | "url" | "email" | "password" = "text";
  value: string;

  /**
   * If outline, the outline is always present.
   */
  @property()
  variant: "default" | "outline" = "default";

  @property()
  accept: string;

  @part("input")
  _input: HTMLInputElement;

  protected render() {
    return html`<div part="root" class="${classList("input-field", this.variant)}">
    ${[
      this._renderPrefix(),
      html`<input
        part="input"
        type="${this.type}"
        id="${this.makeId}"
        .value="${this.value}"
        placeholder="${this.placeholder || nothing}"
        ?autofocus="${this.autofocus}"
        autocapitalize="${this.autocapitalize || nothing}"
        autocomplete="${this.autocomplete || nothing}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
      >`,
      this._renderSuffix(),
    ]}
    </div>`;
  }

  reset() {
    this._input.value = this.default;
    this.value = this.default;
  }
}

export default Input;

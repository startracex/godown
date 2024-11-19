import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { css, html } from "lit";
import { property, query } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import SuperInput from "../core/super-input.js";

const protoName = "switch";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Switch} renders a switch.
 *
 * The switch is rectangular by default,
 * set the round property to rounded switch.
 *
 * @category input
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}-width: 3em;
      ${cssScope}-height: calc(var(${cssScope}-width) / 2);
      ${cssScope}-handle-size: 1.25em;
      ${cssScope}-handle-space: .125em;
      ${cssScope}-transition: .2s ease-in-out;
      background: var(${cssGlobalVars.input}-background);
      width: var(${cssScope}-width);
      height: var(${cssScope}-height);
      display: inline-block;
      vertical-align: bottom;
      border-radius: 0;
    }

    [part="root"],
    span {
      transition: var(${cssScope}-transition);
    }

    [part="root"] {
      border-radius: inherit;
      position: relative;
      height: inherit;
    }

    [part="root"],
    input {
      width: 100%;
    }

    input {
      opacity: 0;
      height: 100%;
      appearance: none;
    }

    span {
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      width: 50%;
      pointer-events: none;
      border-radius: inherit;
    }

    :host([round]) {
      border-radius: calc(var(${cssScope}-height) / 2);
    }

    :host([checked]) span {
      left: 50%;
    }

    .rect .true {
      background: var(${cssGlobalVars.active});
    }

    .rect .false {
      background: var(${cssGlobalVars.passive});
    }

    .round span{
      --size: var(${cssScope}-handle-size);
      border-radius: 100%;
      background: var(--godown--input-control);
      width: var(--size);
      height: var(--size);
      margin: var(${cssScope}-handle-space);
    }

    .round {
      background: var(${cssGlobalVars.passive});
    }

    :host([checked]) .round {
      background: var(${cssGlobalVars.active});
    }
  `,
)
class Switch extends SuperInput {
  /**
   * Border style.
   */
  @property({ type: Boolean, reflect: true })
  round = false;

  /**
   * Whether this element is selected or not.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Disable this element.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Default checked state.
   */
  @property()
  default = "false";

  /**
   * Input value.
   */
  @property()
  value = "on";

  @query("input")
  protected _input: HTMLInputElement;

  protected render() {
    return html`<div part="root" class="${this.round ? "round" : "rect"}">
      <input
        part="input"
        @change="${this._handleChange}"
        ?disabled="${this.disabled}"
        ?checked="${this.checked}"
        name="${this.name}"
        id="${this.makeId}"
        type="checkbox"
      >
      <span part="handle" class="${this.checked}"></span>
    </div>`;
  }

  reset() {
    this.checked = this.default === "true";
    this._input.checked = this.checked;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.checked) {
      this.default = "true";
    }
    if (this.default === "true") {
      this.checked = true;
    }
  }

  protected _handleChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(new CustomEvent("input", { detail: this.checked, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("change", { detail: this.checked, composed: true }));
  }

  namevalue(): [string, boolean] {
    return [this.name, this.checked];
  }
}

export default Switch;

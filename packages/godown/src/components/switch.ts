import { attr, godown, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
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
 * @fires change - Fires when the switch is switched.
 * @category input
 */
@godown(protoName)
@styles(css`
  :host,
  :host([contents]) [part="root"] {
    width: var(${cssScope}-width);
    height: var(${cssScope}-height);
    display: inline-block;
  }

  :host {
    ${cssScope}-width: 3em;
    ${cssScope}-height: calc(var(${cssScope}-width) / 2);
    ${cssScope}-handle-size: 1.25em;
    ${cssScope}-handle-space: .125em;
    ${cssScope}-transition: .2s ease-in-out;
    background: var(${cssGlobalVars.input}-background);
    vertical-align: bottom;
    border-radius: 0;
  }

  [part="root"],
  [part="handle"] {
    transition: var(${cssScope}-transition);
  }

  [part="root"] {
    border-radius: inherit;
    position: relative;
    height: inherit;
  }

  [part="input"] {
    opacity: 0;
    width: 100%;
    height: 100%;
    appearance: none;
  }

  [part="handle"] {
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
    background: var(${cssGlobalVars.passive});
  }

  :host([checked]) [part="handle"] {
    left: 50%;
  }

  .rect .true {
    background: var(${cssGlobalVars.active});
  }

  .rect .false {
    background: var(${cssGlobalVars.passive});
  }

  .round [part="handle"] {
    --size: var(${cssScope}-handle-size);
    border-radius: 100%;
    background: var(--godown--input-control);
    width: var(--size);
    height: var(--size);
    margin: var(${cssScope}-handle-space);
  }

  :host([checked]) .round {
    background: var(${cssGlobalVars.active});
  }
`)
class Switch extends SuperInput {
  /**
   * Display rounded.
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

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        class="${this.round ? "round" : "rect"}"
      >
        <input
          part="input"
          type="checkbox"
          ?disabled="${this.disabled}"
          ?checked="${this.checked}"
          name="${this.name}"
          id="${this.makeId}"
          @change="${this._handleChange}"
        />
        <span
          part="handle"
          class="${this.checked}"
        ></span>
      </div>
    `;
  }

  reset(): void {
    this.checked = this.default === "true";
    this._input.checked = this.checked;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.checked) {
      this.default = "true";
    }
    if (this.default === "true") {
      this.checked = true;
    }
  }

  protected _handleChange(): void {
    this.checked = this._input.checked;
    this.dispatchEvent(new CustomEvent("change", { detail: this.checked, composed: true }));
  }

  namevalue(): [string, boolean] {
    return [this.name, this.checked];
  }
}

export default Switch;
export { Switch };

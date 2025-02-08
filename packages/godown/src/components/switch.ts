import { attr, godown, omit, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import { SuperInput } from "../core/super-input.js";

const protoName = "switch";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Switch} renders a switch.
 *
 * @fires change - Fires when the switch is switched.
 * @category input
 */
@godown(protoName)
@styles(css`
  :host,
  :host([contents]) [part="root"] {
    display: inline-block;
  }

  :host {
    ${cssScope}-width: 3em;
    ${cssScope}-height: calc(var(${cssScope}-width) / 2);
    ${cssScope}-handle-size: 1.25em;
    ${cssScope}-handle-space: calc(var(${cssScope}-width) / 4 - var(${cssScope}-handle-size) / 2);
    ${cssScope}-transition: .2s ease-in-out;
    width: var(${cssScope}-width);
    height: var(${cssScope}-height);
    border-radius: calc(var(${cssScope}-height) / 2);
    background: var(${cssGlobalVars.passive});
    vertical-align: bottom;
    transition: 0.2s ease-in-out;
    transition-property: background, left;
  }

  :host([checked]) {
    background: var(${cssGlobalVars.active});
  }

  [part="root"] {
    display: flex;
    align-items: center;
    position: relative;
    transition: inherit;
  }

  [part="handle"] {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: inherit;
    left: 0;
    top: 50%;
    pointer-events: none;
    border-radius: 100%;
    background: currentColor;
    --size: var(${cssScope}-handle-size);
    width: var(--size);
    height: var(--size);
    transform: translateY(-50%) translateX(var(${cssScope}-handle-space));
  }

  :host([checked]) [part="handle"] {
    left: 50%;
  }

  [part="input"] {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`)
class Switch extends SuperInput<boolean> {
  /**
   * @deprecated
   */
  round: boolean;

  set checked(v: boolean) {
    this.value = v;
  }

  get checked(): boolean {
    return this.value;
  }

  /**
   * Default checked state.
   */
  @property({ type: Boolean })
  default = false;

  /**
   * The current value of the switch component. Reflects the "checked" attribute.
   */
  @property({ type: Boolean, attribute: "checked", reflect: true })
  value = false;

  get observedRecord(): Record<string, any> {
    return omit(super.observedRecord, "outline-type");
  }

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        class="round"
      >
        <input
          part="input"
          type="checkbox"
          ?disabled="${this.disabled}"
          ?checked="${this.value}"
          id="${this.makeId}"
          @change="${this._handleChange}"
        />
        <span part="handle"></span>
      </div>
    `;
  }

  reset(): void {
    this.value = this.default;
    this._input.checked = this.value;
  }

  protected _connectedInit(): void {
    if (this.default) {
      this.value = true;
    } else {
      if (this.value) {
        this.value = true;
        this.default = true;
      }
    }
  }

  protected _handleChange(): void {
    const { checked } = this._input;
    this.value = checked;
    this.dispatchCustomEvent("change", this.value);
  }
}

export default Switch;
export { Switch };

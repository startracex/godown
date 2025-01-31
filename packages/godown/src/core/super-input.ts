import { type HandlerEvent, htmlSlot, omit, part, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars } from "./global-style.js";
import { OutlineBuilder, type OutlineType } from "./outline.js";

const fieldStyle = css`
  .input-field {
    --space: var(${cssGlobalVars.input}-space);
    display: flex;
    position: relative;
    align-items: center;
    border-radius: inherit;
    height: inherit;
  }

  .input-field [part="input"] {
    background: none;
    height: 100%;
    width: 100%;
    color: inherit;
    padding: 0 var(--space);
  }

  .input-field [part="icon"] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(${cssGlobalVars.input}-icon-color);
  }

  .input-field [part="prefix"],
  .input-field [part="suffix"] {
    height: 100%;
    display: flex;
  }

  .input-field [part="suffix"] [part="icon"] {
    padding-inline-end: var(--space);
  }

  .input-field [part="prefix"] [part="icon"] {
    padding-inline-start: var(--space);
  }
`;

const inputStyle = css`
  :host {
    ${cssGlobalVars.input}-width: 10em;
    ${cssGlobalVars.input}-height: 1.6em;
    ${cssGlobalVars.input}-space: 0.2em;
    ${cssGlobalVars.input}-control: currentColor;
    ${cssGlobalVars.input}-outline-width: .075em;
    ${cssGlobalVars.input}-outline-color: var(${cssGlobalVars.passive});
    ${cssGlobalVars.input}-icon-color: var(${cssGlobalVars.passive});
    border-radius: 0.2em;
  }

  :host([disabled]) {
    cursor: not-allowed;
    filter: brightness(0.85);
  }

  :host(:focus-within) {
    ${cssGlobalVars.input}-icon-color: currentColor;
  }

  input:disabled {
    cursor: inherit;
  }

  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
`;

@styles(
  fieldStyle,
  new OutlineBuilder({
    width: `${cssGlobalVars.input}-outline-width`,
    color: `${cssGlobalVars.input}-outline-color`,
  }).styleSheet,
  inputStyle,
)
class SuperInput extends GlobalStyle {
  autofocus = false;
  @property()
  autocomplete: string | boolean;

  @property({ attribute: "outline-type" })
  outlineType: OutlineType = "border";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  type: InputType;

  @property({ reflect: true })
  placeholder: string;

  @property({ reflect: true })
  name: string;

  @property()
  value: any;

  get observedRecord(): Record<string, any> {
    return omit(super.observedRecord, "default", "value");
  }

  /**
   * default property records the default or initial value and is used to reset the input.
   */
  @property()
  default: any;

  @part("input")
  protected _input: HTMLInputElement;

  /**
   * Returns true when the input is compositing.
   */
  compositing = false;

  set defaultValue(value: typeof this.default) {
    this.default = value;
  }

  get defaultValue() {
    return this.default;
  }

  protected makeId: string = Math.random().toString(36).slice(1);

  namevalue(): [string, any] {
    return [this.name, this.value];
  }

  nameValue: () => [string, any] = this.namevalue;

  reset(): void {
    this.value = this.default;
    this._input.value = this.default;
  }

  protected _handleInput(e: HandlerEvent<HTMLInputElement>): void {
    e.stopPropagation();
    if (this.compositing) {
      return;
    }
    this.value = e.target.value?.trim();
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(new CustomEvent("input", { detail: this.value, composed: true, bubbles: true }));
    this.dispatchEvent(new CustomEvent("change", { detail: this.value, composed: true }));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._connectedInit();
  }

  protected _connectedInit(): void {
    this.default ??= this.value || "";
    this.value ??= this.default;
  }

  protected _compositionInit(): void {
    if (this._input) {
      this.events.add(this._input, "compositionstart", () => (this.compositing = true));
      this.events.add(this._input, "compositionend", (e: HandlerEvent<HTMLInputElement>) => {
        this.compositing = false;
        this._handleInput(e);
      });
    }
  }

  protected _changeInputType(t: typeof this.type): void {
    if (this._input) {
      this._input.type = t;
    }
  }

  focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  protected firstUpdated(): void {
    this._compositionInit();
  }

  protected _renderPrefix(): TemplateResult<1> {
    return html`
      <label
        for=${this.makeId}
        part="prefix"
      >
        ${htmlSlot("prefix")}
      </label>
    `;
  }

  protected _renderSuffix(): TemplateResult<1> {
    return html`
      <label
        for=${this.makeId}
        part="suffix"
      >
        ${htmlSlot("suffix")}
      </label>
    `;
  }
}

export default SuperInput;
export { SuperInput };

type InputType =
  | "hidden"
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
  | "checkbox"
  | "radio"
  | "file"
  | "image";

import { type HandlerEvent, htmlSlot, part, styles } from "@godown/element";
import iconEyeSlashFill from "@godown/f7-icon/icons/eye-slash-fill.js";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars } from "./global-style.js";

const fieldStyle = css`
  .input-field {
    display: flex;
    position: relative;
    align-items: center;
    border-radius: inherit;
    height: inherit;
  }

  .input-field [part="input"] {
    background: transparent;
    height: 100%;
    width: 100%;
    color: inherit;
    padding: 0 var(${cssGlobalVars.input}-space);
  }

  .input-field:focus-within,
  .input-field.outline {
    box-shadow: var(${cssGlobalVars.input}-box-shadow);
  }

  .input-field [part="icon"] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input-field [part="prefix"],
  .input-field [part="suffix"] {
    height: 100%;
    display: flex;
  }

  .input-field [part="suffix"] [part="icon"] {
    padding-inline-end: var(${cssGlobalVars.input}-space);
  }

  .input-field [part="prefix"] [part="icon"] {
    padding-inline-start: var(${cssGlobalVars.input}-space);
  }
`;

const inputStyle = css`
  :host {
    ${cssGlobalVars.input}-width: 10em;
    ${cssGlobalVars.input}-height: 1.6em;
    ${cssGlobalVars.input}-space: 0.2em;
    ${cssGlobalVars.input}-background: var(${cssGlobalVars.background});
    ${cssGlobalVars.input}-control: var(${cssGlobalVars.foreground});
    ${cssGlobalVars.input}-control-edge: var(${cssGlobalVars.active});
    ${cssGlobalVars.input}-radius: 0.2em;
    ${cssGlobalVars.input}-box-shadow: 0px 0px 0px .1em var(${cssGlobalVars.active});
    border-radius: var(${cssGlobalVars.input}-radius);
  }

  :host([disabled]) {
    cursor: not-allowed;
    filter: brightness(0.85);
  }

  input:disabled {
    cursor: inherit;
  }

  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
`;

@styles(fieldStyle, inputStyle)
class SuperInput extends GlobalStyle {
  autofocus = false;
  @property()
  autocomplete: string | boolean;

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
    const PASSWORD = "password";
    return html`
      <label
        for=${this.makeId}
        part="suffix"
      >
        ${this.type === "password"
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

export default SuperInput;

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

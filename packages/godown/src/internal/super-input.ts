import { type HandlerEvent, htmlSlot, omit, queryPart, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "./global-style.js";
import { ringTypeAttribute, type RingType } from "./ring.js";

const inputStyle = css`
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

@styles(inputStyle)
class SuperInput<V = string> extends GlobalStyle {
  autofocus = false;
  @property()
  autocomplete: string | boolean;

  @property({ attribute: ringTypeAttribute })
  ringType: RingType = "border";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  placeholder: string;

  @property({ reflect: true })
  name: string;

  @property()
  value: V;

  get observedRecord(): Record<string, any> {
    return omit(super.observedRecord, "default", "value");
  }

  /**
   * default property records the default or initial value and is used to reset the input.
   */
  @property()
  default: any;

  @queryPart("input")
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
    (this.value as string) = e.target.value?.trim();
    this.dispatchCustomEvent("input", this.value, { bubbles: true });
  }

  protected _handleChange(e: HandlerEvent<HTMLInputElement>): void {
    this.dispatchCustomEvent("change", this.value);
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

  focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  protected firstUpdated(): void {
    this._compositionInit();
  }

  protected _renderPrefix(): TemplateResult<1> {
    return html`
      <i part="prefix">${htmlSlot("prefix")}</i>
    `;
  }

  protected _renderSuffix(): TemplateResult<1> {
    return html`
      <i part="suffix">${htmlSlot("suffix")}</i>
    `;
  }
}

export default SuperInput;
export { SuperInput };

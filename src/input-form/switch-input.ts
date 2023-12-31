import { css, CSSResultGroup, cssvar, define, html, property, query } from "../deps.js";
import { htmlSlot } from "../tmpl.js";
import { InputSTD } from "./std.js";

@define("switch-input")
export class SwitchInput extends InputSTD {
  static styles = [
    InputSTD.styles,
    css`
      :host {
        width: 3em;
        height: 1.5em;
      }

      :host,
      span {
        display: inline-flex;
        font-size: inherit;
        position: relative;
        align-items: center;
        border-radius: inherit;
      }

      span {
        width: inherit;
        height: inherit;
      }

      input {
        width: inherit;
        height: inherit;
        margin: 0;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        font-size: inherit;
        background-color: var(${cssvar}--input-false);
        border-radius: inherit;
        transition: all 0.3s;
      }

      aside {
        pointer-events: none;
        transition: 0.3s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        font-size: inherit;
        overflow: hidden;
        border-radius: inherit;
      }

      aside div {
        height: 100%;
      }

      input[disabled] ~ aside {
        filter: brightness(0.87);
      }

      .rect div.always {
        display: none;
      }

      .always {
        position: absolute;
      }

      .rect aside {
        height: 100%;
        width: 100%;
        left: 0;
      }

      .rect .true,
      .rect .false {
        width: 50%;
        text-align: center;
        transition: all 0.3s;
      }

      .rect input:checked ~ aside div.true,
      .rect .false {
        background-color: var(${cssvar}--input-true);
      }

      .rect input:checked ~ aside div.false,
      .rect .true {
        background-color: var(${cssvar}--input-false);
      }

      .fat aside {
        width: 1.2em;
        height: 1.2em;
        border-radius: 50%;
        background-color: var(${cssvar}--input-control);
        transition: 0.3s;
        left: 0.15em;
        top: 0.15em;
        bottom: 0.15em;
      }

      .fat {
        border-radius: 0.75em;
      }

      .fat input:checked {
        background-color: var(${cssvar}--input-true);
      }

      .fat input:checked ~ aside {
        left: calc(100% - 0.15em - 1.2em);
        right: 0.15em;
      }

      .fat input:checked ~ aside div.true,
      .fat div.false {
        display: block;
      }

      .fat input:checked ~ aside div.false,
      .fat div.true {
        display: none;
      }
    `,
  ] as CSSResultGroup[];
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property() base: "fat" | "rect" = "rect";
  @property() def = "false";
  @property() name = "checkbox";
  @property() value = "on";
  @query("input") _input: HTMLInputElement;

  render() {
    return html`<span class="${this.base}">
      <input @change="${this._handleChange}" ?disabled="${this.disabled}" ?checked="${this.checked}" name="${this.name}" type="checkbox" />
      <aside>
        <div class="false"><slot name="false"></slot></div>
        <div class="always">${htmlSlot()}<slot name="always"></slot></div>
        <div class="true"><slot name="true"></slot></div>
      </aside>
    </span>`;
  }

  reset() {
    this.checked = this.def === "true";
    this._input.checked = this.checked;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.checked) {
      this.def = "true";
    } else if (this.def === "true") {
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

export default SwitchInput;
declare global {
  interface HTMLElementTagNameMap {
    "switch-input": SwitchInput;
  }
}

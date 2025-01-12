import { type HandlerEvent, attr, classList, godown, styles } from "@godown/element";
import { type TemplateResult, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import SuperInput from "../core/super-input.js";

const protoName = "split";
const cssScope = scopePrefix(protoName);

const loop = <T>(len: number, fn: (index?: number) => T) => {
  const result: T[] = new Array(len);
  for (let index = 0; index < len; index++) {
    result[index] = fn(index);
  }
  return result;
};

/**
 * {@linkcode Split} renders multiple input boxes.
 *
 * Input: will move the focus box backward until the complete input from start to end.
 *
 * Delete: will move the focus box forward until the first and no inputs for each.
 *
 * @fires input - Fires when the input value changes.
 * @fires change - Fires when the input value changes.
 * @fires focus - Fires when the input is focused.
 * @fires blur - Fires when the input is blurred.
 * @category input
 */
@godown(protoName)
@styles(css`
  :host {
    color: var(${cssGlobalVars.foreground});
    display: block;
    border-radius: 1px;
    width: fit-content;
    ${cssScope}--size: 1.45em;
    ${cssScope}--gap: .25em;
  }

  :host([contents]) [part="root"] {
    width: fit-content;
  }

  [part="root"] {
    gap: var(${cssScope}--gap);
    width: 100%;
    position: relative;
    vertical-align: top;
    display: flex;
    justify-content: space-between;
    border-radius: inherit;
  }

  [part="input-box"] {
    width: var(${cssScope}--size);
    height: var(${cssScope}--size);
    vertical-align: top;
    text-align: center;
    background-color: var(${cssGlobalVars.input}-background);
    border-radius: inherit;
  }

  [part="input"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    background: none;
    position: absolute;
    z-index: -1;
  }

  .focus {
    box-shadow: var(${cssGlobalVars.input}-box-shadow);
  }
`)
class Split extends SuperInput {
  /**
   * The number of input boxes.
   */
  @property({ type: Number })
  len = 6;

  /**
   * Focus index.
   */
  @property({ type: Number })
  index = -1;

  @state()
  current = -1;

  @state()
  currentValue: (string | void)[] = [];

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${loop(
          this.len,
          (index: number) => html`
            <span
              part="input-box"
              class="${classList({ focus: this.current === index })}"
              @click="${this.disabled ? null : () => this.focusAt(index)}"
            >
              ${this.currentValue[index]}
            </span>
          `,
        )}
        <input
          part="input"
          id="${this.makeId}"
          @blur=${this.blur}
          @input="${this._handleInput}"
          .value="${
            /* Ensure that input always has a value of length this.len */
            this.value.padStart(this.len, " ")
          }"
        />
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.reset();
  }

  protected _handleInput(e: HandlerEvent<HTMLInputElement, InputEvent>): void {
    e.stopPropagation();
    if (this.compositing) {
      return;
    }

    this.fillInput(e.data);
    this.value = this.currentValue.join("");

    this.dispatchEvent(new CustomEvent("input", { detail: this.value, composed: true, bubbles: true }));
  }

  /**
   * Fill input with data.
   *
   * If data is null
   *  - If current value is null, move to before.
   *  - If current value is not null, delete it.
   *
   * If data is not null
   *  - If current value is null, input data.
   *  - If current value is not null, input data and move to after.
   *
   * If data is multiple characters,
   *   Fill input with data[0] and call fillInput with data.slice(1).
   *
   * @param data Input event data.
   */
  protected fillInput(data: string | null): void {
    if (data === null) {
      // delete

      if (this.currentValue[this.current] !== null) {
        // delete exist value

        this.currentValue[this.current] = null;
      } else {
        // go to before

        this.currentValue[this.current - 1] = null;
        const lastNotNull = this.currentValue.findLastIndex((a) => a !== null);
        this.current = this.current - 1 < 0 ? (lastNotNull < 0 ? 0 : lastNotNull) : this.current - 1;
      }
      return;
    }

    const multiple = data.length > 1;

    // input
    this.currentValue[this.current] = data[0];
    if (this.current + 1 >= this.len) {
      // index overflow

      this.current = this.currentValue.indexOf(null);
      if (this.current === -1) {
        this.blur();
      }
    } else {
      // go to after

      this.current += 1;
    }

    if (multiple) {
      const after = data.slice(1);
      if (after) {
        this.fillInput(after);
      }
    }
  }

  focus(): void {
    this.focusAt(this.current);
    super.focus();
  }

  focusAt(i: number): void {
    this.current = i;
    this._input.focus();
    this.dispatchEvent(new CustomEvent("focus", { detail: i, bubbles: true, composed: true }));
  }

  blur(): void {
    this._input.blur();
    this.current = -1;
    super.blur();
    this.dispatchEvent(new CustomEvent("blur", { bubbles: true, composed: true }));
  }

  reset(): void {
    this.current = -1;
    this.value = this.default;
    this.currentValue = this.value.split("").concat(Array(this.len - this.value.length).fill(null));
    if (this.index > -1) {
      this.current = this.index;
    }
  }
}

export default Split;
export { Split };

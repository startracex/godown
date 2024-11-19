import { godown } from "@godown/element/decorators/godown.js";
import { part } from "@godown/element/decorators/part.js";
import { styles } from "@godown/element/decorators/styles.js";
import { classList } from "@godown/element/directives/class-list.js";
import { joinProperties } from "@godown/element/tools/css.js";
import { isNil } from "@godown/element/tools/lib.js";
import { css, html } from "lit";
import { property, queryAll, state } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import SuperInput from "../core/super-input.js";

const protoName = "range";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Range} is similar to `<input type="range">`.
 *
 * Value accepts number, or array.
 *
 * Number has 1 handle, the array has the number of its elements and the minimum is 2.
 *
 * @category input
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}-handle-active: var(${cssGlobalVars._colors.blue[7]});
      ${cssScope}-track-width: .5em;
      background: var(${cssGlobalVars.input}-background);
      width: var(${cssGlobalVars.input}-width);
      display: inline-block;
      margin: 0.25em 0;
    }

    :host([vertical]) {
      height: var(${cssGlobalVars.input}-width);
      width: fit-content;
    }

    :host(:not([disabled])) .last-focus {
      z-index: 1;
      ${cssScope}-handle-scale:1.05;
      background: var(${cssScope}-handle-active);
    }

    [part="root"] {
      min-height:inherit;
      position: relative;
      border-radius: inherit;
      width: 100%;
      --from: 0%;
      --to: 50%;
      height: var(${cssScope}-track-width);
    }

    [part="track"] {
      height: 100%;
      min-height:inherit;
      display: flex;
      position: absolute;
      pointer-events: none;
      border-radius: inherit;
      justify-content: space-between;
      left: min(var(--from), var(--to));
      background: var(${cssGlobalVars.active});
      width: max(calc(var(--to) - var(--from)), calc(var(--from) - var(--to)));
    }

    [part="handle"] {
      width: 1em;
      height: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      position: absolute;
      border: 0.1em solid;
      border-radius: 50%;
      transform-origin: 0% 25%;
      transform: scale(var(${cssScope}-handle-scale, 1)) translate(-50%, -25%);
      background: var(${cssGlobalVars.active});
      border-color: var(${cssGlobalVars.input}-control);
    }
  `,
  css`
    .vertical {
      height: 100%;
      width: var(${cssScope}-track-width);
    }

    .vertical i {
      transform: translate(-25%, -50%);
    }

    .vertical [part="track"] {
      width: 100%;
      height: max(calc(var(--to) - var(--from)), calc(var(--from) - var(--to)));
      top: min(var(--from), var(--to));
      left: 0;
    }
  `,
  css`
    [part="handle"] {
      left: var(--handle);
      top: 0;
    }

    .vertical [part="handle"] {
      top: var(--handle);
      left: 0;
    }
  `,
)
class Range extends SuperInput {
  /**
   * Minimum value.
   */
  @property({ type: Number })
  min = 0;

  /**
   * Maximum value.
   */
  @property({ type: Number })
  max = 100;

  /**
   * Sliding step length.
   */
  @property({ type: Number })
  step: number;

  /**
   * Display vertically.
   */
  @property({ type: Boolean, reflect: true })
  vertical: boolean;

  /**
   * When `this.range` is true, it should be [number, number], otherwise number.
   */
  @property({ type: Array })
  value: number | number[];
  /**
   * The default of `this.value`.
   */
  @property({ type: Array })
  default: typeof this.value;

  @part("root")
  protected _root: HTMLElement;

  @queryAll("[part=handle]")
  protected _handles: NodeListOf<HTMLElement>;

  @state()
  lastFocus?: number;

  /**
   * Returns true when the second number is greater than the first number.
   */
  get reverse() {
    return this.range ? this.value[0] > this.value[1] : false;
  }

  /**
   * If value is array.
   */
  get range(): boolean {
    return Array.isArray(this.value);
  }

  /**
   * Return values in the form of an array.
   */
  get rangeValue(): number[] {
    return (this.range ? this.value : [this.value]) as number[];
  }

  /**
   * @param len Minimum result length.
   * @param value Fill value.
   * @returns Array with length of len.
   */
  padValue(len: number, value = 0): number[] {
    const { rangeValue } = this;
    const miss = len - rangeValue.length;
    if (miss > 0) {
      return new Array(miss).fill(value).concat(rangeValue);
    }
    return rangeValue;
  }

  protected render() {
    const rangeValue = this.padValue(2);
    const from = Math.min(...rangeValue);
    const to = Math.max(...rangeValue);
    const gap = this.max - this.min;

    return html`<div
      part="root"
      class="${
      classList({
        vertical: this.vertical,
        range: this.range,
        reverse: this.reverse,
      })
    }"
      @mousedown="${this.disabled ? null : this._handleMousedownRoot}"
      style="${
      joinProperties({
        "--from": `${((from - this.min) / gap) * 100}%`,
        "--to": `${((to - this.min) / gap) * 100}%`,
        ...(this.range
          ? Object.fromEntries(
            rangeValue.map((value, index) => [
              `--handle-${index}`,
              `${((value - this.min) / gap) * 100}%`,
            ]),
          )
          : {}),
      })
    }"><div part="track"></div>
      ${
      this.range
        ? (this.value as number[]).map((_, index) => this.renderHandle(index))
        : this.renderHandle(0)
    }
    </div>`;
  }

  protected renderHandle(index: number) {
    const { range } = this;
    const end = !range || index === (this.value as number[]).length - 1;
    return html`<i
      tabindex="0"
      part="handle"
      class="${classList({ "last-focus": this.lastFocus === index })}"
      @mousedown="${this.disabled ? null : this.createMouseDown(index)}"
      @focus="${this.disabled ? null : () => this.focusHandle(index)}"
      @blur="${this.disabled ? null : this.blurHandle}"
      style="--handle:var(--${
      /* In single-handle mod or end, it is max value */
      (!range && end) ? `to` : `handle-${index}`})"
      ></i>
      `;
  }

  private _keydownEvent: EventListenerOrEventListenerObject;

  focusHandle(index: number) {
    this.lastFocus = index;
    const handleItem = this._handles.item(index);
    handleItem?.focus();
    if (!this._keydownEvent) {
      this._keydownEvent = this.events.add(document, "keydown", this.createKeydownEvent(index));
    }
  }

  blurHandle() {
    this.lastFocus = undefined;
    this._keydownEvent = this.events.remove(document, "keydown", this._keydownEvent);
  }

  protected createKeydownEvent(index: number) {
    if (!this.range) {
      index = 0;
    }
    return (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        this.createSetValue(index)(old => old - this.step);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        this.createSetValue(index)(old => old + this.step);
      }
    };
  }

  createMouseDown(index: number) {
    return (e: MouseEvent) => {
      this.focusHandle(index);
      this.createMousedownListener(this.createSetValue(index))(e);
    };
  }

  protected _handleMousedownEnd(e: MouseEvent) {
    this.lastFocus = 0;
    this.createMousedownListener(this.setEnd)(e);
    this.focusHandle(0);
  }

  createSetValue(index: number) {
    return (numberOrModifier: number | ((value: number) => number)) => {
      const number = typeof numberOrModifier === "number"
        ? this.normalizeValue(numberOrModifier)
        : numberOrModifier(this.rangeValue[index]);
      let newValue: any = number;
      if (this.range) {
        newValue = [...this.rangeValue];
        newValue[index] = number;
      }
      this.value = newValue;
    };
  }

  setEnd(value: number) {
    this.createSetValue((this.value as any)?.length - 1 || 0)(value);
  }

  /**
   * Compute value from event.
   */
  protected _computeValue(e: MouseEvent) {
    const rect = this._root.getBoundingClientRect();
    const div = this.vertical ? (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width;
    const value = Math.round((div * (this.max - this.min)) / this.step) * this.step;
    return this.normalizeValue(value);
  }

  /**
   * Ensure that the values do not exceed the range of max and min.
   */
  protected normalizeValue(value: number) {
    if (value > this.max) { value -= this.step; }
    else if (value < this.min) { value += this.step; }
    return value;
  }

  protected _handleMousedownRoot(e: MouseEvent) {
    const value = this._computeValue(e);
    const index = this.range
      ? this.rangeValue.reduce((acc, item, index) => {
        const diff = Math.abs(value - item);
        const prevDiff = Math.abs(value - this.rangeValue[acc]);
        return diff < prevDiff ? index : acc;
      }, 0)
      : 0;

    const set = this.createSetValue(index);
    set(value);
    this.createMousedownListener(set)(e);
    this.focusHandle(index);
  }

  protected createMousedownListener(mouseMoveCallback: (arg0: number) => void) {
    return (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const move = this.createMousemoveListener(mouseMoveCallback);
      this.events.add(document, "mousemove", move);
      const stop = () => {
        this.events.remove(document, "mousemove", move);
        this.events.remove(document, "mouseup", stop);
      };
      this.events.add(document, "mouseup", stop);
    };
  }

  protected createMousemoveListener(callback: (arg0: number) => void) {
    return (e: MouseEvent) => {
      const value = this._computeValue(e);
      if (value > this.max || value < this.min) {
        return;
      }
      callback?.call(this, value);
    };
  }

  protected _connectedInit() {
    const gap = this.max - this.min;
    this.step ||= gap / 100;
    if (isNil(this.value)) {
      if (!isNil(this.default)) {
        this.value = this.default;
      } else {
        this.value = Math.round(gap / 2 / this.step) * this.step;
      }
    }
    this.default ??= this.value;
  }

  reset() {
    this.value = this.default;
  }

  sort() {
    return this.value = this.toSorted();
  }

  toSorted() {
    if (this.range) {
      return [...this.value as number[]].sort((a, b) => a - b);
    }
    return this.value;
  }
}

export default Range;

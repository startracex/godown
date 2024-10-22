import { godown } from "@godown/element/decorators/godown.js";
import { part } from "@godown/element/decorators/part.js";
import { styles } from "@godown/element/decorators/styles.js";
import { classList } from "@godown/element/directives/class-list.js";
import { conditionIf } from "@godown/element/directives/condition-if.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { joinProperties } from "@godown/element/tools/css.js";
import { isNil } from "@godown/element/tools/lib.js";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import SuperInput from "../core/super-input.js";

const protoName = "range";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Range} is similar to <input type="range">.
 *
 * Value accepts a number, or an array of two numbers.
 *
 * Number have one handle, array have two.
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

     :host(:not([disabled])) i:active {
      ${cssScope}-handle-scale:1.05;
      background: var(${cssScope}-handle-active);
    }

    .last-focus {
      z-index: 1;
    }

    [part="root"] {
      min-height:inherit;
      position: relative;
      border-radius: inherit;
      width: 100%;
      --start: 0%;
      --end: 50%;
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
      left: min(var(--start), var(--end));
      background: var(${cssGlobalVars.active});
      width: max(calc(var(--end) - var(--start)), calc(var(--start) - var(--end)));
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
      height: max(calc(var(--end) - var(--start)), calc(var(--start) - var(--end)));
      top: min(var(--start), var(--end));
      left: 0;
    }
  `,
  css`
    .start {
      left: var(--start);
      top: 0;
    }

    .end {
      left: var(--end);
      top: 0;
    }

    .vertical .start {
      top: var(--start);
      left: 0;
    }

    .vertical .end {
      top: var(--end);
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
  step = 1;

  @property({ type: Boolean, reflect: true })
  vertical: boolean;

  /**
   * When `this.range` is true, it should be [number, number], otherwise number.
   */
  @property({ type: Array })
  value: number | [number, number];
  /**
   * The default of `this.value`.
   */
  @property({ type: Array })
  default: number | [number, number];

  @part("root")
  _root: HTMLElement;

  @state()
  lastFocus: undefined | 1 | 2;

  /**
   * Returns true when the second number is greater than the first number
   */
  get reverse() {
    return this.range ? this.value[0] > this.value[1] : false;
  }

  /**
   * Enable range sliding.
   */
  get range(): boolean {
    return Array.isArray(this.value);
  }

  get rangeValue(): [number, number] {
    return (this.range ? this.value : [0, this.value]) as [number, number];
  }

  protected render() {
    const [from, to] = this.rangeValue;
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
      joinProperties({ "--start": `${((from - this.min) / gap) * 100}%`, "--end": `${((to - this.min) / gap) * 100}%` })
    }">
      <div part="track"></div>
    ${
      conditionIf(
        this.range,
        html`<i
        part="handle"
        class="${classList({ "last-focus": this.lastFocus === 1 }, "start")}"
        @mousedown="${this.disabled ? null : this._handleMousedownStart}">
        ${htmlSlot("start")}
      </i>`,
      )
    }
      <i
        part="handle"
        class="${classList({ "last-focus": this.lastFocus === 2 }, "end")}"
        @mousedown="${this.disabled ? null : this._handleMousedownEnd}">
        ${htmlSlot("end")}
      </i>
    </div>`;
  }

  protected _handleMousedownStart(e: MouseEvent) {
    this.lastFocus = 1;
    this.createMousedownListener(this.setStart)(e);
  }
  protected _handleMousedownEnd(e: MouseEvent) {
    this.lastFocus = 2;
    this.createMousedownListener(this.setEnd)(e);
  }

  setStart(value: number) {
    const i = this.value[1];
    this.value = this.range ? [value, i] : value;
  }

  setEnd(value: number) {
    const i = this.value[0];
    this.value = this.range ? [i, value] : value;
  }

  protected _computeValue(e: MouseEvent) {
    const rect = this._root.getBoundingClientRect();
    const div = this.vertical ? (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width;
    let value = Math.round((div * (this.max - this.min)) / this.step) * this.step;
    if (value > this.max) { value -= this.step; }
    else if (value < this.min) { value += this.step; }
    return value;
  }

  protected _handleMousedownRoot(e: MouseEvent) {
    const value = this._computeValue(e);
    if (!this.range || Math.abs(value - this.value[0]) > Math.abs(value - this.value[1])) {
      this.setEnd(value);
      this._handleMousedownEnd(e);
    } else {
      this.setStart(value);
      this._handleMousedownStart(e);
    }
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
    if (!isNil(this.default) && isNil(this.value)) {
      this.value = this.default;
    } else if (isNil(this.default) && !isNil(this.value)) {
      this.default = this.value;
    } else {
      const mid = Math.round(gap / 2 / this.step) * this.step;
      this.default = this.range ? [0, mid] : mid;
      this.value = this.default;
    }
  }

  reset() {
    this.value = this.default;
  }

  swap() {
    if (this.range) {
      const [a, b] = this.value as [number, number];
      this.value = [b, a];
    }
  }

  sort() {
    this.value = this.toSorted();
  }

  toSorted(): number | [number, number] {
    if (this.range) {
      const [a, b] = this.value as [number, number];
      return a > b ? [b, a] : [a, b];
    }
    return this.value;
  }
}

export default Range;

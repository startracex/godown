import { attr, tokenList, godown, loop, styles } from "@godown/element";
import { isNullable, omit, Ranger } from "sharekit";
import { type TemplateResult, css, html } from "lit";
import { property, query, queryAll, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { cssGlobalVars, scopePrefix } from "../../internal/global-style.js";
import { SuperInput } from "../../internal/super-input.js";
import { ringTypeAttribute } from "../../internal/ring.js";

const protoName = "range";
const cssScope = scopePrefix(protoName);

type RangeValue = number | number[];

/**
 * {@linkcode Range} is similar to `<input type="range">`.
 *
 * Value accepts number, or array.
 *
 * Number has 1 handle, the array has the number of its elements.
 *
 * @fires range - Fires when the value changes.
 * @category input
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--track-width: .5em;
      ${cssScope}--handle-scale: 1;
      ${cssScope}--track-background: var(${cssGlobalVars.active});
      background: var(${cssGlobalVars.passive});
      width: 100%;
      display: block;
      height: var(${cssScope}--track-width);
    }

    :host([contents]) [part="root"] {
      width: inherit;
    }

    :host([vertical]) {
      height: 100%;
      width: fit-content;
    }

    [part="root"] {
      min-height: inherit;
      position: relative;
      border-radius: inherit;
      --from: 0%;
      --to: 50%;
    }

    [part="track"] {
      height: 100%;
      min-height: inherit;
      display: flex;
      position: absolute;
      pointer-events: none;
      border-radius: inherit;
      justify-content: space-between;
      left: min(var(--from), var(--to));
      background: var(${cssScope}--track-background);
      width: max(calc(var(--to) - var(--from)), calc(var(--from) - var(--to)));
    }

    [part~="handle"] {
      width: 1em;
      height: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      position: absolute;
      border-radius: 50%;
      transform-origin: 0% 25%;
      outline: 0;
      border-style: solid;
      border-width: 0.1em;
      transform: scale(var(${cssScope}--handle-scale)) translate(-50%, -25%);
      background: var(${cssGlobalVars.background});
      border-color: currentColor;
    }
  `,
  css`
    [vertical] {
      height: inherit;
      width: var(${cssScope}--track-width);
    }

    [vertical] i {
      transform: translate(-25%, -50%);
    }

    [vertical] [part="track"] {
      width: 100%;
      height: max(calc(var(--to) - var(--from)), calc(var(--from) - var(--to)));
      top: min(var(--from), var(--to));
      left: 0;
    }
  `,
  css`
    [part~="handle"] {
      left: var(--handle);
      top: 0;
    }

    [vertical] [part~="handle"] {
      top: var(--handle);
      left: 0;
    }
  `,
)
class Range<V extends RangeValue = RangeValue> extends SuperInput<RangeValue> {
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
   * Whether to display the range vertically.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  /**
   * Value, or each of values, will render a handle.
   *
   * Accepts number or array of numbers.
   */
  @property({ type: Array })
  value: V;

  /**
   * The default of `{@linkcode this.value}`.
   */
  @property({ type: Array })
  default: V;

  @query("[part=root]")
  protected _root: HTMLElement;

  @queryAll("[part=handle]")
  protected _handles: NodeListOf<HTMLElement>;

  @state()
  lastFocus?: number;

  protected _ranger: Ranger;
  private __focusStack: number[] = [];

  get range(): V extends number ? false : true {
    return Array.isArray(this.value) as any;
  }

  /**
   * Return values in the form of an array.
   */
  get rangeValue(): number[] {
    return (this.range ? this.value : [this.value]) as number[];
  }

  /**
   * Pad the value to the specified length.
   */
  padValue(len: number, value = 0): number[] {
    const { rangeValue } = this;
    const miss = len - rangeValue.length;
    if (miss > 0) {
      return new Array(miss).fill(value).concat(rangeValue);
    }
    return rangeValue;
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === "max" || name === "min" || name === "step") {
      this._ranger = new Ranger(this.min, this.max, this.step);
    }
  }

  get observedRecord(): Record<string, any> {
    return omit(super.observedRecord, ringTypeAttribute);
  }

  protected render(): TemplateResult<1> {
    const rangeValue = this.padValue(2);
    const from = Math.min(...rangeValue);
    const to = Math.max(...rangeValue);
    const gap = this._ranger.diff;

    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        @mousedown="${this.disabled ? null : this._handleMousedownRoot}"
        style="${styleMap(
          Object.fromEntries([
            ["--from", `${((from - this.min) / gap) * 100}%`],
            ["--to", `${((to - this.min) / gap) * 100}%`],
            ...rangeValue.map(
              (value, index) => [`--handle-${index}`, `${((value - this.min) / gap) * 100}%`] as [string, string],
            ),
          ]),
        )}"
      >
        <div part="track"></div>
        ${loop(this.rangeValue.length, (index) => this._renderHandle(index))}
      </div>
    `;
  }

  protected _renderHandle(index: number): TemplateResult<1> {
    const { disabled, range, rangeValue } = this;

    // in single-handle mod (value is a number or an array with length 1),
    const end = !range || (range && index === rangeValue.length - 1 && rangeValue.length === 1);
    return html`
      <i
        tabindex="0"
        part="${tokenList("handle", `handle-${index}`)}"
        @mousedown="${disabled ? null : this.createMouseDown(index)}"
        style="${styleMap({
          "z-index": this.__focusStack.indexOf(index) + 1,
          "--handle": `var(--${end ? "to" : `handle-${index}`})`,
        })}"
      ></i>
    `;
  }

  private __keydownEvent: EventListenerOrEventListenerObject;

  /**
   * Focuses the handle at the given index, updates the focus stack.
   * @param index - The index of the handle to focus.
   */
  focusHandle(index: number): void {
    this.lastFocus = index;
    const indexOfFocusStack = this.__focusStack.indexOf(index);
    if (indexOfFocusStack !== -1) {
      this.__focusStack.splice(indexOfFocusStack, 1);
    }
    this.__focusStack.push(index);
    const handleItem = this._handles.item(index);
    handleItem?.focus();
    if (!this.__keydownEvent) {
      this.__keydownEvent = this.events.add(document, "keydown", this.createKeydownEvent(index));
    }
  }

  /**
   * Removes the focus from the currently focused handle.
   */
  blurHandle(): void {
    this.lastFocus = undefined;
    this.__keydownEvent = this.events.remove(document, "keydown", this.__keydownEvent);
  }

  /**
   * Creates a keydown event handler that updates the value of the range based on arrow key presses.
   * @param index - The index of the handle to update.
   * @returns A function that handles the keydown event and updates the range value.
   */
  protected createKeydownEvent(index: number) {
    return (e: KeyboardEvent): void => {
      const { rangeValue, step } = this;
      if (rangeValue.length < 2) {
        index = 0;
      }
      const old = rangeValue[index];
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        this.createSetValue(index)(old - step);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        this.createSetValue(index)(old + step);
      }
    };
  }

  /**
   * Creates a mouse down event handler that focuses the handle at the given index and sets the value of the range.
   * @param index - The index of the handle to focus.
   * @returns A function that handles the mouse down event and updates the range value.
   */
  protected createMouseDown(index: number) {
    return (e: MouseEvent): void => {
      this.focusHandle(index);
      this.createMousedownListener(this.createSetValue(index))(e);
    };
  }

  /**
   * Creates a function that sets the value of the range at the given index.
   * @param index - The index of the value to set.
   * @returns A function that sets the value of the range.
   */
  protected createSetValue(index: number) {
    return (value: number): void => {
      const normalizeValue = this._ranger.normalize(value);
      let newValue: RangeValue = normalizeValue;
      if (this.range) {
        newValue = [...(this.value as number[])];
        newValue[index] = normalizeValue;
      }
      this.value = newValue as V;
      this.dispatchCustomEvent("change", this.value);
    };
  }

  /**
   * Compute value from event.
   * @returns The value closest to the event client position.
   */
  protected _computeValue({ clientX, clientY }: MouseEvent): number {
    const { top, left, height, width } = this._root.getBoundingClientRect();
    return this._ranger.present(this.vertical ? (clientY - top) / height : (clientX - left) / width);
  }

  /**
   * Handles the mouse down event on the root element of the range component.
   * Computes the closest value to the mouse position, sets the value, and focuses the corresponding handle.
   * @param e - The mouse down event object.
   */
  protected _handleMousedownRoot(e: MouseEvent): void {
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

  /**
   * Creates a mouse down event handler that focuses the handle at the given index and sets the value of the range.
   * @param index - The index of the handle to focus.
   * @returns A function that handles the mouse down event and updates the range value.
   */
  protected createMousedownListener(mouseMoveCallback: (arg0: number) => void) {
    return (e: MouseEvent): void => {
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

  /**
   * Creates a mouse move event handler that updates the range value based on the mouse position.
   * @param callback - A function to call with the new value when the mouse is moved.
   * @returns A function that handles the mouse move event and updates the range value.
   */
  protected createMousemoveListener(callback: (newValue: number) => void) {
    return (e: MouseEvent): void => {
      const value = this._computeValue(e);
      if (value !== this._ranger.restrict(value)) {
        return;
      }
      callback?.call(this, value);
    };
  }

  protected _connectedInit(): void {
    this._ranger = new Ranger(this.min, this.max, this.step);
    const gap = this._ranger.diff;
    this.step ||= gap / 100;
    if (isNullable(this.value)) {
      if (!isNullable(this.default)) {
        this.value = this.default;
      } else {
        (this.value as number) = Math.round(gap / 2 / this.step) * this.step;
      }
    }
    this.default ??= this.value;
  }

  reset(): void {
    this.value = this.default;
  }

  sort(): V {
    return (this.value = this.toSorted());
  }

  toSorted(): V {
    if (this.range) {
      return [...(this.value as number[])].sort((a, b) => a - b) as V;
    }
    return this.value;
  }
}

export default Range;
export { Range };

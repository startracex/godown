import { attr, godown, htmlSlot, queryPart, styles } from "@godown/element";
import iconCaretLeft from "../../internal/icons/caret-left.js";
import iconCaretRight from "../../internal/icons/caret-right.js";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../../internal/global-style.js";

const protoName = "carousel";

function getWidth(e) {
  return e.getBoundingClientRect().width;
}

/**
 * {@linkcode Carousel} make the content display as a carousel.
 *
 * When this component is `firstUpdated`,
 * clone the first and last element and make the matching element visible when switching index.
 *
 * @slot - Carousel items, should maintain the same size.
 * @fires change - Fires when the index changes.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    display: block;
    transition: 0.3s;
  }

  [part="root"] {
    direction: ltr;
    overflow: hidden;
  }

  [part="root"],
  [part="move-root"] {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    transition: inherit;
  }

  [part="prev"],
  [part="next"] {
    height: 100%;
    width: 1.5em;
    z-index: 1;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  [part="prev"] {
    left: 0;
  }

  [part="next"] {
    right: 0;
  }

  slot::slotted(*) {
    flex-shrink: 0 !important;
  }
`)
class Carousel extends GlobalStyle {
  /**
   * The index of the current item.
   */
  @property({ type: Number })
  index = 0;

  /**
   * The duration of the transition.
   */
  @property({ type: Number })
  autoChange = 0;

  @queryPart("move-root")
  protected _moveRoot: HTMLElement;

  intervalID: number;

  private __cloneFirst: HTMLElement | undefined;

  private __cloneLast: HTMLElement | undefined;

  protected _offset: number;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        <i
          part="prev"
          @click="${this.prev}"
        >
          ${iconCaretLeft()}
        </i>
        <div part="move-root">${htmlSlot()}</div>
        <i
          part="next"
          @click="${this.next}"
        >
          ${iconCaretRight()}
        </i>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.children.length) {
      this.__cloneFirst?.remove();
      this.__cloneLast?.remove();
      this.__cloneLast = this.firstElementChild.cloneNode(true) as HTMLElement;
      this.__cloneFirst = this.lastElementChild.cloneNode(true) as HTMLElement;
      this.appendChild(this.__cloneLast);
      this.insertBefore(this.__cloneFirst, this.firstElementChild);
    }
    this.observers.add(this, ResizeObserver, () => {
      this._offset = this._computeOffset();
      this._doTranslateX(`${this._offset}px`, true);
    });
  }

  protected async firstUpdated(): Promise<void> {
    await this.updateComplete;
    this.show(this.index, true);
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === "index" && this.isConnected) {
      this.show(this.index);
    }
  }

  show(i: number, n?: boolean): void {
    i = this.normalizeIndex(i);
    this.index = i;
    this._offset = this._computeOffset();
    this._doTranslateX(`${this._offset}px`, n);
    this.dispatchCustomEvent("change", i);
    this.timeouts.remove(this.intervalID);
    if (this.autoChange > 0) {
      this.intervalID = this.timeouts.add(
        setInterval(() => {
          this.next();
        }, this.autoChange),
      );
    }
  }

  next(): void {
    if (this.index === this.childElementCount - 3) {
      this._doTranslateX("0", true);
      this.show(0);
    } else {
      this.show(this.index + 1);
    }
  }

  prev(): void {
    if (this.index === 0) {
      this._doTranslateX(`-${this.childElementCount - 1}00%`, true);
      this.show(this.children.length - 3);
    } else {
      this.show(this.index - 1);
    }
  }

  protected _doTranslateX(xValue: string, noTransition?: boolean): void {
    this._moveRoot.style.transform = `translateX(${xValue})`;
    this._moveRoot.style.transition = noTransition ? "none" : "";
  }

  protected _computeOffset(): number {
    let offset = 0;
    for (let childIndex = 0; childIndex <= this.index; childIndex++) {
      offset -= getWidth(this.children[childIndex]);
    }
    offset += (getWidth(this) - getWidth(this.children[this.index + 1])) / 2;
    return offset;
  }

  normalizeIndex(i: number): number {
    if (i < 0) {
      return 0;
    }
    if (i > this.children.length - 3) {
      return this.children.length - 3;
    }
    return i;
  }
}

export default Carousel;
export { Carousel };

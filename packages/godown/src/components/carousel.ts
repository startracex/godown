import { attr, godown, htmlSlot, part, styles } from "@godown/element";
import iconChevronLeft from "@godown/f7-icon/icons/chevron-left.js";
import iconChevronRight from "@godown/f7-icon/icons/chevron-right.js";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

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
   * The index of the element is displayed for the first time.
   */
  @property({ type: Number })
  index = 0;

  /**
   * If autoChange > 0, the rotation will be automated.
   */
  @property({ type: Number })
  autoChange = 0;

  @part("move-root")
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
          ${iconChevronLeft()}
        </i>
        <div part="move-root">${htmlSlot()}</div>
        <i
          part="next"
          @click="${this.next}"
        >
          ${iconChevronRight()}
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
    this._offset = 0;
    for (let childIndex = 0; childIndex <= i; childIndex++) {
      this._offset -= getWidth(this.children[childIndex]);
    }
    this._offset += (getWidth(this) - getWidth(this.children[i + 1])) / 2;
    this.dispatchEvent(new CustomEvent("change", { detail: i, composed: true }));
    this._doTranslateX(`${this._offset}px`, n);
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

  normalizeIndex(i: number): number {
    if (i < 0) {
      return 0;
    } else if (i > this.children.length - 3) {
      return this.children.length - 3;
    }
    return i;
  }
}

export default Carousel;
export { Carousel };

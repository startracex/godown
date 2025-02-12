import { type EventListenerFunc, attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "dragbox";

/**
 * {@linkcode Dragbox} moves with the mouse and does not exceed the boundary of offsetParent.
 *
 * @category wrapper
 */
@godown(protoName)
@styles(css`
  :host {
    position: absolute;
    display: block;
  }

  :host(:active) {
    -webkit-user-select: none;
    user-select: none;
  }
`)
class Dragbox extends GlobalStyle {
  /**
   * Width of (`this.offsetParent` or `document.body`).
   */
  get offsetsWidth(): number {
    return this.offsetParent?.clientWidth ?? document.body.offsetWidth;
  }

  /**
   * Height of (`this.offsetParent` or `document.body`).
   */
  get offsetsHeight(): number {
    return this.offsetParent?.clientHeight ?? document.body.offsetHeight;
  }

  private __drag = false;
  private __t: number;
  private __l: number;
  private __x: number;
  private __y: number;

  /**
   * Position x.
   */
  @property()
  x: string;

  /**
   * Position y.
   */
  @property()
  y: string;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        @mousedown="${this._handleDragStart}"
      >
        ${htmlSlot()}
      </div>
    `;
  }

  protected firstUpdated(): void {
    this.reset();
  }

  protected _handleDragStart(e: MouseEvent): void {
    this.__x = e.x;
    this.__y = e.y;
    this.__t = this.offsetTop;
    this.__l = this.offsetLeft;
    this.__drag = true;
    this._handleMouseMove = this.events.add(document, "mousemove", this._handleDrag.bind(this));
    this._handleMouseLeave = this.events.add(document, "mouseleave", this._handleDragEnd.bind(this));
    this._handleMouseUp = this.events.add(document, "mouseup", this._handleDragEnd.bind(this));
  }

  protected _handleMouseMove: EventListenerFunc;
  protected _handleMouseLeave: EventListenerFunc;
  protected _handleMouseUp: EventListenerFunc;

  protected _handleDragEnd(): void {
    this.__drag = false;
    this.events.remove(document, "mousemove", this._handleMouseMove);
    this.events.remove(document, "mouseleave", this._handleMouseLeave);
    this.events.remove(document, "mouseup", this._handleMouseUp);
  }

  protected _handleDrag(e: MouseEvent): void {
    if (!this.__drag) {
      return;
    }
    const { __x, __y, __l, __t, style, offsetsWidth, offsetsHeight, offsetWidth, offsetHeight } = this;
    const l = e.x - (__x - __l);
    const t = e.y - (__y - __t);
    if (l < 0) {
      style.left = "0";
    } else if (l < offsetsWidth - offsetWidth) {
      style.left = `${l}px`;
    } else {
      style.left = `${offsetsWidth - offsetWidth}"px"`;
    }
    if (t < 0) {
      style.top = "0";
    } else if (t < offsetsHeight - offsetHeight) {
      style.top = `${t}px`;
    } else {
      style.top = `${offsetsHeight - offsetHeight}px`;
    }
  }

  reset(): void {
    const { x, y, style, offsetsWidth, offsetsHeight, offsetWidth, offsetHeight, offsetLeft, offsetTop } = this;
    style.left = x || "0";
    style.top = y || "0";
    if (offsetLeft > offsetsWidth - offsetWidth) {
      style.left = `${offsetsWidth - offsetWidth}px`;
    }
    if (offsetTop > offsetsHeight - offsetHeight) {
      style.top = `${offsetsHeight - offsetHeight}px`;
    }
  }
}

export default Dragbox;
export { Dragbox };

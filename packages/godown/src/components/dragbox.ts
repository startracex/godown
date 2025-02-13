import { type EventListenerFunc, attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "dragbox";

/**
 * {@linkcode Dragbox} moves with the mouse and does not exceed the boundary of offsetParent.
 *
 * @slot - Dragbox content.
 * @category layout
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
   * Offset parent or document.body.
   */
  get _offsetParent(): Element {
    return this.offsetParent ?? document.body;
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
    const parentRect = this._offsetParent.getBoundingClientRect();
    const rect = this.getBoundingClientRect();
    this.__t = rect.top - parentRect.top;
    this.__l = rect.left - parentRect.left;
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
    const { __x, __y, __l, __t, style } = this;
    const { height: parentHeight, width: parentWidth } = this._offsetParent.getBoundingClientRect();
    const { width, height } = this.getBoundingClientRect();
    const l = e.x - (__x - __l);
    const t = e.y - (__y - __t);
    if (l < 0) {
      style.left = "0";
    } else if (l < parentWidth - width) {
      style.left = `${l}px`;
    } else {
      style.left = `${parentWidth - width}"px"`;
    }
    if (t < 0) {
      style.top = "0";
    } else if (t < parentHeight - height) {
      style.top = `${t}px`;
    } else {
      style.top = `${parentHeight - height}px`;
    }
  }

  reset(): void {
    const { x, y, style, offsetWidth, offsetHeight, offsetLeft, offsetTop } = this;
    const { height: parentHeight, width: parentWidth } = this._offsetParent.getBoundingClientRect();

    style.left = x || "0";
    style.top = y || "0";
    if (offsetLeft > parentWidth - offsetWidth) {
      style.left = `${parentWidth - offsetWidth}px`;
    }
    if (offsetTop > parentHeight - offsetHeight) {
      style.top = `${parentHeight - offsetHeight}px`;
    }
  }
}

export default Dragbox;
export { Dragbox };

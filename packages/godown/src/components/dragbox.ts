import { type EventListenerFunc, attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "dragbox";

/**
 * {@linkcode Dragbox} does not extend beyond the range of {@linkcode Dragbox.offsetsWidth} and {@linkcode Dragbox.offsetsHeight}.
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

  private drag = false;
  private t: number;
  private l: number;
  private cx: number;
  private cy: number;

  /**
   * Position x.
   */
  @property()
  x = "auto";

  /**
   * Position y.
   */
  @property()
  y = "auto";

  protected render(): TemplateResult<1> {
    return html`<div
      part="root"
      ${attr(this.observedRecord)}
      @mousedown="${this._handleDragStart}"
      @mouseup="${this._handleDragEnd}"
    >
      ${htmlSlot()}
    </div>`;
  }

  protected firstUpdated(): void {
    this.reset();
  }

  protected _handleDragStart(e: MouseEvent): void {
    this.cx = e.clientX;
    this.cy = e.clientY;
    this.t = this.offsetTop;
    this.l = this.offsetLeft;
    this.drag = true;
    this._handleMouseMove = this.events.add(document, "mousemove", this._handleDrag.bind(this));
    this._handleMouseLeave = this.events.add(document, "mouseleave", this._handleDragEnd.bind(this));
  }

  protected _handleMouseMove: EventListenerFunc;
  protected _handleMouseLeave: EventListenerFunc;

  protected _handleDragEnd(): void {
    this.drag = false;
    this.events.remove(document, "mousemove", this._handleMouseMove);
    this.events.remove(document, "mouseleave", this._handleMouseLeave);
  }

  protected _handleDrag(e: MouseEvent): void {
    if (!this.drag) {
      return;
    }
    const nl = e.clientX - (this.cx - this.l);
    const nt = e.clientY - (this.cy - this.t);
    const { style, offsetsWidth, offsetsHeight, offsetWidth, offsetHeight } = this;
    if (nl < 0) {
      style.left = "0";
    } else if (nl < offsetsWidth - offsetWidth) {
      style.left = `${nl}px`;
    } else {
      style.left = `${offsetsWidth - offsetWidth}"px"`;
    }
    if (nt < 0) {
      style.top = "0";
    } else if (nt < offsetsHeight - offsetHeight) {
      style.top = `${nt}px`;
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

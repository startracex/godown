import { godown, htmlSlot, queryPart, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";

import { GlobalStyle, scopePrefix } from "../../internal/global-style.js";

const protoName = "rotate";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Rotate} Make child elements rotate.
 *
 * @category wrapper
 */
@godown(protoName)
@styles(css`
  :host {
    display: block;
    width: -moz-fit-content;
    width: fit-content;
    transition: all 0.5s ease-in-out;
    ${cssScope}--offset: .5em;
  }

  div {
    position: relative;
    transition: inherit;
    transition-property: transform;
  }

  i {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    box-sizing: content-box;
    padding: var(${cssScope}--offset);
    margin: calc(-1 * var(${cssScope}--offset));
  }

  [part="slot"] {
    z-index: 2;
  }
`)
class Rotate extends GlobalStyle {
  @queryPart("root")
  protected _root: HTMLElement;

  protected render(): TemplateResult<1> {
    return html`
      <div part="root">
        <div
          part="slot"
          @mousemove="${this._handleRotate}"
        >
          ${htmlSlot()}
        </div>
        <i @mouseleave="${this.reset}"></i>
      </div>
    `;
  }

  reset(): void {
    this._root.style.removeProperty("transform");
    this._root.style.removeProperty("transition");
  }

  protected _handleRotate(e: MouseEvent): void {
    const { rotateX, rotateY } = this._computeOffset(e);
    this._root.style.setProperty("transform", `rotateX(${rotateX}rad) rotateY(${rotateY}rad)`);
    this._root.style.setProperty("transition", "0s");
  }

  /**
   * Compute offset.
   *
   * @returns rotateX, rotateY
   * @example
   * ```ts
   * const { rotateX, rotateY } = this._computeOffset(e);
   * `rotateX(${rotateX}rad) rotateY(${rotateY}rad)`;
   * ```
   */
  protected _computeOffset(e: MouseEvent): {
    rotateX: number;
    rotateY: number;
  } {
    const { left, top, width, height } = this._root.getBoundingClientRect();
    const { clientX, clientY } = e;
    const offsetX = clientX - left;
    const offsetY = clientY - top;

    const rotateX = -(offsetY - height / 2) / height / 2;
    const rotateY = (offsetX - width / 2) / width / 2;
    return { rotateX, rotateY };
  }
}

export default Rotate;
export { Rotate };

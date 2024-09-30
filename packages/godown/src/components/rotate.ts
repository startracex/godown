import { godown } from "@godown/element/decorators/godown.js";
import { part } from "@godown/element/decorators/part.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { css, html } from "lit";

import { GlobalStyle, scopePrefix } from "../core/global-style.js";

const protoName = "rotate";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Rotate} Make child elements rotate.
 *
 * @category wrapper
 */
@godown(protoName)
@styles(
  css`
  :host {
    display: block;
    width: -moz-fit-content;
    width: fit-content;
    transition: all 0.5s ease-in-out;
    ${cssScope}--padding: .75em;
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

  [part="slot"]{
    z-index: 2;
  }
`,
)
class Rotate extends GlobalStyle {
  @part("root")
  _root: HTMLElement;

  protected render() {
    return html`<div part="root">
      <div part="slot" @mousemove="${this._handleRotate}">${htmlSlot()}</div>
      <i @mouseleave="${this.reset}"></i>
    </div>`;
  }

  reset() {
    this._root.style.removeProperty("transform");
    this._root.style.removeProperty("transition");
  }

  protected _handleRotate(e: MouseEvent) {
    const { rotateX, rotateY } = this._computeOffset(e);
    this._root.style.setProperty("transform", `rotateX(${rotateX}rad) rotateY(${rotateY}rad)`);
    this._root.style.setProperty("transition", "0s");
  }

  /**
   * Compute offset.
   * ```
   * `rotateX(${rotateX}rad) rotateY(${rotateY}rad)`
   * ```
   * @param e Mouse move event.
   * @returns rotateX, rotateY
   */
  _computeOffset(e: MouseEvent) {
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

import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import svgCaretDown from "@godown/f7-icon/icons/chevron-down.js";
import { css, html } from "lit";
import { property, query } from "lit/decorators.js";

import { scopePrefix } from "../core/global-style.js";
import SuperOpenable from "../core/super-openable.js";

const protoName = "details";

const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Details} similar to `<details>`.
 *
 * @category display
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--icon-deg-open: 0deg;
      ${cssScope}--icon-deg-close: 90deg;
      ${cssScope}--icon-deg: 0deg;
      ${cssScope}--icon-space: 0.3em;
      ${cssScope}--summary-direction: row;
      ${cssScope}--transition: .3s;
      height: fit-content;
      display: block;
      transition: var(${cssScope}--transition);
    }

    dl {
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    dt {
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      background: inherit;
      align-items: center;
      flex-direction: var(${cssScope}--summary-direction);
    }

    dd {
      display: grid;
      overflow: hidden;
      grid-template-rows: 0fr;
      transition: var(${cssScope}--transition);
      transition-property: grid-template-rows;
    }

    i {
      display: flex;
      backface-visibility: hidden;
      padding: var(${cssScope}--icon-space);
      transition: var(${cssScope}--transition);
      transform: rotate(var(${cssScope}--icon-deg));
    }

    :host([open]) dd {
      grid-template-rows: 1fr;
    }

    :host([float]) dd {
      top: 100%;
      position: absolute;
    }

    i {
      transform: rotate(var(${cssScope}--icon-deg-close));
    }
    :host([open]) i {
      transform: rotate(var(${cssScope}--icon-deg-open));
    }
  `,
)
class Details extends SuperOpenable {
  /**
   * If it is true, the summary event scope will fill the element.
   */
  @property({ type: Boolean })
  fill = false;
  /**
   * Summary text.
   */
  @property()
  summary = "";

  @query("dd")
  _dd: HTMLDataListElement;

  protected render() {
    return html`<dl part="root">
      <dt part="title" @click="${this._handelClick}">
        <span part="summary">${this.summary || htmlSlot("summary")} </span>
        <span><i part="icon">${svgCaretDown()}</i></span>
      </dt>
      <dd part="details" @click=${this.fill ? () => this.toggle() : null}>
        <div style="min-height: 0;">${htmlSlot()}</div>
      </dd>
    </dl>`;
  }
}

export default Details;

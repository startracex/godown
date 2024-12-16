import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { attr } from "@godown/element/directives/attr.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import svgCaretDown from "@godown/f7-icon/icons/chevron-down.js";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { scopePrefix } from "../core/global-style.js";
import SuperOpenable from "../core/super-openable.js";

const protoName = "details";

const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Details} similar to `<details>`.
 *
 * @slot summary - Details summary if no `summary` is provided.
 * @slot - Details content.
 * @fires change - Fired when the details is toggled.
 * @category display
 */
@godown(protoName)
@styles(
  css`
    :host {
      ${cssScope}--icon-deg-open: 0deg;
      ${cssScope}--icon-deg-close: 90deg;
      ${cssScope}--icon-space: 0.3em;
      ${cssScope}--summary-direction: row;
      ${cssScope}--transition: .3s;
      height: fit-content;
      display: block;
      transition: var(${cssScope}--transition);
    }

    [part=root] {
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    [part=title] {
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      background: inherit;
      align-items: center;
      flex-direction: var(${cssScope}--summary-direction);
    }

    [part=details] {
      display: grid;
      overflow: hidden;
      grid-template-rows: 0fr;
      transition: var(${cssScope}--transition);
      transition-property: grid-template-rows;
    }

    :host([open]) [part=details] {
      grid-template-rows: 1fr;
    }

    :host([float]) [part=details] {
      top: 100%;
      position: absolute;
    }

    [part=icon] {
      display: flex;
      backface-visibility: hidden;
      padding: var(${cssScope}--icon-space);
      transition: var(${cssScope}--transition);
      transform: rotate(var(${cssScope}--icon-deg-close));
    }

    :host([open]) [part=icon] {
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

  protected render(): TemplateResult<1> {
    return html`<dl part="root" ${attr(this.observedRecord)}>
      <dt part="title" @click="${this._handelClick}">
        <span part="summary">${this.summary || htmlSlot("summary")}</span>
        <span>
          <i part="icon">${svgCaretDown()}</i>
        </span>
      </dt>
      <dd part="details" @click=${this.fill ? () => this.toggle() : null}>
        <div style="min-height: 0;">${htmlSlot()}</div>
      </dd>
    </dl>`;
  }
}

export default Details;

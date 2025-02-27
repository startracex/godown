import { attr, godown, htmlSlot, styles } from "@godown/element";
import svgCaretDown from "@godown/f7-icon/icons/chevron-down.js";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { scopePrefix } from "../../internal/global-style.js";
import { SuperOpenable } from "../../internal/super-openable.js";

const protoName = "details";

const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Details} similar to `<details>`.
 *
 * @slot summary - Details summary if no `summary` is provided.
 * @slot - Details content.
 * @fires change - Fires when the open changes.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--icon-deg-open: 0deg;
    ${cssScope}--icon-deg-close: 90deg;
    padding: 0.2em;
    display: block;
    transition: 0.3s;
  }

  [part="root"] {
    position: relative;
  }

  [part="title"] {
    direction: ltr;
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    transition: inherit;
    overflow: hidden;
  }

  [part="details"] {
    overflow: hidden;
    display: grid;
    grid-template-rows: 0fr;
    transition: inherit;
  }

  :host([open]) [part="details"] {
    grid-template-rows: 1fr;
  }

  [float] [part="details"] {
    position: absolute;
    top: 100%;
    width: 100%;
  }

  [part] {
    transition: inherit;
    transition-property: transform, grid-template-rows;
  }

  [part="icon"] {
    display: flex;
    backface-visibility: hidden;
    transform: rotate(var(${cssScope}--icon-deg-close));
  }

  :host([open]) [part="icon"] {
    transform: rotate(var(${cssScope}--icon-deg-open));
  }
`)
class Details extends SuperOpenable {
  /**
   * Determines whether the details component should float.
   */
  @property({ type: Boolean })
  float = false;

  /**
   * Determines whether the details component should fill the available space.
   */
  @property({ type: Boolean })
  fill = false;

  /**
   * The summary text to display in the details component.
   */
  @property()
  summary = "";

  protected render(): TemplateResult<1> {
    return html`
      <dl
        part="root"
        ${attr(this.observedRecord)}
      >
        <dt
          part="title"
          @click="${() => this.toggle()}"
        >
          <span part="summary">${this.summary || htmlSlot("summary")}</span>
          <span part="icon">${svgCaretDown()}</span>
        </dt>
        <dd
          part="details"
          @click=${this.fill ? () => this.toggle() : null}
        >
          <div style="min-height: 0;">${htmlSlot()}</div>
        </dd>
      </dl>
    `;
  }
}

export default Details;
export { Details };

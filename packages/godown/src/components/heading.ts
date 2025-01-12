import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "heading";

/**
 * {@linkcode Heading} renders a heading.
 *
 * If the id is provided, the anchor will be displayed.
 *
 * @slot - Heading content.
 * @category layout
 */
@godown(protoName)
@styles(css`
  :host {
    display: block;
    text-align: start;
  }

  [part="anchor"] {
    position: absolute;
    text-align: center;
    min-width: 1.25em;
    right: 100%;
  }

  [side="left"] [part="anchor"] {
    right: 100%;
  }
  [side="right"] [part="anchor"] {
    left: 100%;
  }

  a {
    color: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    direction: ltr;
    font-size: revert;
    position: relative;
    width: fit-content;
  }
`)
class Heading extends GlobalStyle {
  /**
   * The heading level.
   */
  @property()
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";

  /**
   * The anchor prefix.
   */
  @property()
  anchor = "#";

  /**
   * The anchor side.
   */
  @property()
  side: "left" | "right" = "left";

  protected render(): TemplateResult<1> {
    return html`<a part="root" href="${this.id ? "#" + this.id : nothing}" ${attr(this.observedRecord)}>
      ${this.wrapHeading(htmlSlot(), this.id ? html`<i part="anchor">${this.anchor}</i>` : "")}
    </a> `;
  }

  protected wrapHeading(...children: any[]): TemplateResult<1> {
    switch (this.as) {
      case "h2":
        return html`<h2>${children}</h2>`;
      case "h3":
        return html`<h3>${children}</h3>`;
      case "h4":
        return html`<h4>${children}</h4>`;
      case "h5":
        return html`<h5>${children}</h5>`;
      case "h6":
        return html`<h6>${children}</h6>`;
      default:
        return html`<h1>${children}</h1>`;
    }
  }
}

export default Heading;
export { Heading };

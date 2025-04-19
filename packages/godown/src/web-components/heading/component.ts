import { godown, htmlSlot, styles, tokenList } from "@godown/element";
import { type TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import Link from "../link/component.js";

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

  [part~="anchor"] {
    position: absolute;
    text-align: center;
    min-width: 1.25em;
    right: 100%;
  }

  [part~="left"][part~="anchor"] {
    right: 100%;
  }

  [part~="right"][part~="anchor"] {
    left: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    width: fit-content;
    position: relative;
  }
`)
class Heading extends Link {
  /**
   * The heading level.
   */
  @property()
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";

  /**
   * The anchor prefix.
   *
   * Element must have an id to be displayed.
   */
  @property()
  anchor = "#";

  /**
   * The anchor side.
   */
  @property()
  side: "left" | "right" = "left";

  protected render(): TemplateResult<1> {
    const hrefValue = this.href || (this.id ? "#" + this.id : undefined);
    return html`
      <a
        part="root"
        href="${hrefValue || nothing}"
      >
        ${this.wrapHeading(
          htmlSlot(),
          hrefValue
            ? html`
                <i part="${tokenList("anchor", this.side)}">${this.anchor}</i>
              `
            : "",
        )}
      </a>
    `;
  }

  protected wrapHeading(...children: any[]): TemplateResult<1> {
    switch (this.as) {
      case "h2":
        return html`
          <h2>${children}</h2>
        `;
      case "h3":
        return html`
          <h3>${children}</h3>
        `;
      case "h4":
        return html`
          <h4>${children}</h4>
        `;
      case "h5":
        return html`
          <h5>${children}</h5>
        `;
      case "h6":
        return html`
          <h6>${children}</h6>
        `;
      default:
        return html`
          <h1>${children}</h1>
        `;
    }
  }
}

export default Heading;
export { Heading };

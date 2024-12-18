import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { attr } from "@godown/element/directives/attr.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "heading";

/**
 * {@linkcode Heading} renders a heading.
 *
 * If the id is provided, the anchor will be displayed.
 *
 * @slot - The content of the heading.
 * @category layout
 */
@godown(protoName)
@styles(
  css`
    :host {
      display: block;
      text-align: start;
    }

    [part=root] {
      position: relative;
    }

    a {
      color: inherit;
      position: absolute;
      inset: 0;
    }

    [part=anchor] {
      position: absolute;
      text-align: center;
      min-width: 1.25em;
      right: 100%;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: revert;
    }
  `,
)
class Heading extends GlobalStyle {
  @property({ type: String })
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";

  @property({ type: String })
  anchor = "#";

  protected render(): TemplateResult<1> {
    return html`<div part="root" ${attr(this.observedRecord)}>
      ${
      this.wrapHeading(
        this.id ? html`<a href="#${this.id}"><i part="anchor">${this.anchor}</i></a>` : "",
        html`<p>${htmlSlot()}</p>`,
      )
    }
    </div> `;
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

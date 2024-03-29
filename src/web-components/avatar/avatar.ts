import { css, html, ifDefined, property } from "../../.deps.js";
import { define } from "../../decorators/define.js";
import { htmlSlot, type HTMLTemplate } from "../../lib/templates.js";
import GodownAnchor from "../../supers/anchor.js";
import { createScope } from "../../supers/root.js";

const defineName = "avatar";
const cssvarScope = createScope(defineName);

/**
 * {@linkcode Avatar} renders the avatar or name and has a href.
 */
@define(defineName)
export class Avatar extends GodownAnchor {
  /**
   * Image src.
   */
  @property() src: string | undefined | null = "";
  /**
   * Default image src.
   */
  @property() def: string = undefined;
  /**
   * Link href.
   */
  @property() href = undefined;
  /**
   * If the image is not available, the {@linkcode Avatar.avaName} will be displayed.
   */
  @property() name = "";
  /**
   * If there is a value, the {@linkcode Avatar.avaMore} will be displayed.
   */
  @property({ type: Number }) more = 0;

  static styles = [
    css`
      :host {
        ${cssvarScope}--ava: 1.5em;
        display: inline-flex;
        align-items: center;
      }

      * {
        border-radius: inherit;
      }

      img {
        width: 100%;
        height: 100%;
      }

      a {
        height: var(${cssvarScope}--ava);
        width: var(${cssvarScope}--ava);
        color: inherit;
        display: flex;
        position: relative;
        align-items: inherit;
      }

      span {
        position: absolute;
        width: 100%;
        text-align: center;
      }

      slot[name="mask"] {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  protected render(): HTMLTemplate {
    return html`
      <a href="${ifDefined(this.href)}"> ${this.renderAva()} ${htmlSlot("mask")} </a>
      ${htmlSlot()}
    `;
  }

  private renderAva(): HTMLTemplate {
    if (this.more) {
      return html`<span>${this.avaMore()}</span>`;
    }
    if (this.src) {
      return html`<img src="${this.src}" @error=${this.imgOnError} alt="" />`;
    }
    if (this.name) {
      return html`<span>${this.avaName()}</span>`;
    }
    return htmlSlot("avatar");
  }

  avaMore(): string | number {
    if (this.more < 0) {
      return "+";
    }
    return (this.more > 99 ? "99" : this.more) + "+";
  }

  avaName(): string {
    const name = this.name.slice(0, 2);
    return name[0].toUpperCase() + name.slice(1);
  }

  imgOnError(e: ErrorEvent) {
    if (this.def) {
      (e.target as HTMLImageElement).src = this.def;
    } else {
      this.src = undefined;
    }
  }
}

export default Avatar;

declare global {
  interface HTMLElementTagNameMap {
    "avatar-a": Avatar;
    "g-avatar": Avatar;
  }
}

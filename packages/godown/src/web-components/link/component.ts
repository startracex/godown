import { attr, godown, htmlSlot, styles } from "@godown/element";
import { property } from "lit/decorators.js";

import Router from "../router/component.js";
import { css, html, nothing, type TemplateResult } from "lit";
import GlobalStyle from "../../internal/global-style.js";

const protoName = "link";

const linkTypes = {
  push: "push",
  replace: "replace",
  normal: "normal",
  auto: "auto",
} as const;

type LinkType = keyof typeof linkTypes;

/**
 * {@linkcode Link} is used for link jumping, works standalone or in {@linkcode Router}.
 *
 * Set `type` to `"normal"`,
 * behave like a normal anchor.
 *
 * Set `type` to `"push" `or `"replace"`,
 * update history state by `history.pushState` or `history.replaceState`,
 * update all routers whether current pathname is registered or not.
 *
 * Set `type` to `"auto"`,
 * only update the routers if the current pathname is registered,
 * if not registered, behave like `"normal"`.
 *
 * `replace` property will enforce `history.replaceState`.
 *
 * @fires navigate - Fires when the link is clicked.
 * @category navigation
 */
@godown(protoName)
@styles(css`
  :host {
    display: inline-block;
    cursor: default;
  }

  :host([href]) {
    cursor: pointer;
  }

  a {
    display: contents;
  }
`)
class Link extends GlobalStyle {
  /**
   * If `"normal"`, behave like a normal anchor.
   *
   * If `"auto"` or `"push"`, call `history.pushState` if `replace` is false,
   *
   * If `"replace"`, call `history.replaceState`.
   */
  @property()
  type: LinkType = linkTypes.auto;

  /**
   * If `true`, the {@linkcode Router} will not be updated.
   */
  @property({ type: Boolean })
  suppress = false;

  /**
   * Use `replaceState` instead of `pushState`.
   */
  @property({ type: Boolean })
  replace = false;

  /**
   * A element href.
   */
  @property()
  href: string;

  /**
   * A element target.
   */
  @property()
  target: "_blank" | "_self" | "_parent" | "_top" = "_self";

  /**
   * Location state object.
   */
  state = {};

  get pathname(): string {
    return new URL(this.href, location.href).pathname;
  }

  protected _handleClick(e: MouseEvent): void {
    const { state, type, href, pathname, suppress } = this;
    if (!href) {
      return;
    }
    this.dispatchCustomEvent("navigate", {
      ...this.observedRecord,
      pathname,
      state,
    });
    if (href.startsWith("#") || type === linkTypes.normal) {
      return;
    }
    this.handleState();
    const routers = [...Router.routerInstances];
    if (
      // only runs when suppress is false
      !suppress &&
      (type !== linkTypes.auto ||
        // in auto mode, only update the routers if the current pathname is registered
        routers.some((i) => i.search(location.pathname)))
    ) {
      e.preventDefault();
      Router.routerInstances.forEach((i) => {
        i.handlePopstate();
      });
    }
  }

  handleState: () => void = () => {
    switch (this.type) {
      case linkTypes.auto:
      case linkTypes.push:
        if (!this.replace) {
          // type is auto or push and replace is false
          history.pushState(this.state, "", this.href);
          break;
        }
      // fallthrough to replace
      case linkTypes.replace:
        history.replaceState(this.state, "", this.href);
        break;
    }
  };

  protected render(): TemplateResult<1> {
    return html`
      <a
        part="root"
        ${attr(this.observedRecord)}
        href="${this.href || nothing}"
        target="${this.target}"
        @click=${this._handleClick}
      >
        ${htmlSlot()}
      </a>
    `;
  }
}

export default Link;
export { Link };

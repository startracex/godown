import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { htmlStyle } from "@godown/element/directives/html-style.js";
import { constructCSSObject, toVar } from "@godown/element/tools/css.js";
import iconCheckAltCircle from "@godown/f7-icon/icons/checkmark-alt-circle.js";
import iconExclamationCircle from "@godown/f7-icon/icons/exclamationmark-circle.js";
import iconInfoCircle from "@godown/f7-icon/icons/info-circle.js";
import iconLightbulb from "@godown/f7-icon/icons/lightbulb.js";
import iconQuestionCircle from "@godown/f7-icon/icons/question-circle.js";
import iconSlashCircle from "@godown/f7-icon/icons/slash-circle.js";
import iconXmark from "@godown/f7-icon/icons/xmark.js";
import iconXmarkCircle from "@godown/f7-icon/icons/xmark-circle.js";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../core/global-style.js";

const protoName = "alert";
const cssScope = scopePrefix(protoName);

const vars = ["color", "background"].map((v) => `${cssScope}--${v}`);

const genDark = (key: string) => {
  return [cssGlobalVars._colors[key][5], cssGlobalVars._colors[key][9]];
};

const darkStyles = constructCSSObject(
  vars,
  {
    green: genDark("green"),
    blue: genDark("blue"),
    orange: genDark("orange"),
    red: genDark("red"),
    yellow: genDark("yellow"),
    purple: genDark("purple"),
    teal: genDark("teal"),
    pink: genDark("pink"),
    gray: [cssGlobalVars._colors.lightgray[5], cssGlobalVars._colors.darkgray[5]],
    white: [cssGlobalVars._colors.lightgray[2], cssGlobalVars._colors.darkgray[7]],
    black: [cssGlobalVars._colors.darkgray[8], cssGlobalVars._colors.lightgray[5]],
  },
  () => `:host`,
  (prop) => toVar(prop),
);

const genLight = (key: string) => {
  return [cssGlobalVars._colors[key][6], cssGlobalVars._colors[key][0]];
};

const lightStyles = constructCSSObject(
  vars,
  {
    green: genLight("green"),
    blue: genLight("blue"),
    orange: genLight("orange"),
    red: genLight("red"),
    yellow: genLight("yellow"),
    purple: genLight("purple"),
    teal: genLight("teal"),
    pink: genLight("pink"),
    gray: [cssGlobalVars._colors.darkgray[5], cssGlobalVars._colors.lightgray[7]],
    white: [cssGlobalVars._colors.lightgray[0], cssGlobalVars._colors.darkgray[0]],
    black: [cssGlobalVars._colors.darkgray[7], cssGlobalVars._colors.lightgray[3]],
  },
  () => `:host`,
  (prop) => toVar(prop),
);

const calls = {
  tip: {
    color: "teal",
    icon: iconLightbulb,
  },
  success: {
    color: "green",
    icon: iconCheckAltCircle,
  },
  info: {
    color: "blue",
    icon: iconInfoCircle,
  },
  warning: {
    color: "orange",
    icon: iconExclamationCircle,
  },
  danger: {
    color: "red",
    icon: iconXmarkCircle,
  },
  error: {
    color: "red",
    icon: iconXmarkCircle,
  },
  help: {
    color: "purple",
    icon: iconQuestionCircle,
  },
  deprecated: {
    color: "gray",
    icon: iconSlashCircle,
  },
};

/**
 * {@linkcode Alert} renders a alert.
 *
 * Color defaults to blue.
 *
 * @slot - Alert content.
 * @slot title - Alert title.
 * @slot icon - Alert icon.
 * @category feedback
 */
@godown(protoName)
@styles(
  css`
    :host {
      border-radius: var(${cssScope}--border-radius);
      ${cssScope}--border-radius: .25em;
      ${cssScope}--border-width: .075em;
      ${cssScope}--blockquote-width: .2em;
      ${cssScope}--padding: .5em;
      display: block;
      width: 100%;
    }

    [part=root] {
      --color: var(${cssScope}--color);
      color: var(--color);
      width: 100%;
      transition: 0.25s;
      display: flex;
      justify-content: space-between;
      padding: var(${cssScope}--padding);
      border-radius: inherit;
      border: var(${cssScope}--border-width) solid var(--color);
      background: var(${cssScope}--background);
    }

    [variant=blockquote] {
      border-radius: 0;
      border-left: var(${cssScope}--blockquote-width) solid var(--color);
      border-bottom: none;
      border-right: none;
      border-top: none;
      background: transparent;
    }

    [part=content]{
      color: var(--color);
    }

    [part=root] {
      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto 1fr;
    }

    [part=title] {
      line-height: 2em;
    }

    [part=icon] {
      display: inline-grid;
      align-items: center;
      height: 2em;
    }

    [part=icon] svg {
      margin-right: .5em;
      width: 1.25em;
      height: 1.25em;
    }

    [part=content] {
      grid-row: span 2 / span 2;
      line-height: 1.5em;
    }
    `,
)
class Alert extends GlobalStyle {
  /**
   * If it is a legal value, the icon and preset color will be rendered.
   */
  @property()
  call: "tip" | "success" | "info" | "warning" | "danger" | "error" | "help" | "deprecated";

  /**
   * The tone of the component.
   * Overrides the color of the call.
   */
  @property()
  color:
    | "white"
    | "black"
    | "gray"
    | "green"
    | "teal"
    | "blue"
    | "red"
    | "purple"
    | "orange"
    | "yellow"
    | "pink"
    | "none" = "blue";

  /**
   * Close delay, if 0, it will not be closed automatically.
   */
  @property({ type: Number })
  autoclose = 0;

  /**
   * The title is bold and the icon height is the same as it.
   */
  @property()
  title: string;

  /**
   * Content, if zero value, will be rendered as an unnamed slot.
   */
  @property()
  content: string;

  /**
   * Set true to hide the close button.
   *
   * The behavior may change due to the {@linkcode variant} property.
   */
  @property({ type: Boolean })
  hideClose = false;

  /**
   * Alert variant, if set to `blockquote`, the alert will be rendered as a blockquote.
   *
   * If variant is `"blockquote"`, hide the close button.
   */
  @property()
  variant: "blockquote" | "dark" | "light" = "dark";

  protected render() {
    const color = calls[this.call]?.color || this.color;
    const icon = this.call ? calls[this.call].icon() : htmlSlot("icon");
    return [
      html`<div part="root" variant="${this.variant}">
      <div part="icon">${icon}</div>
      <div part="content">
        <strong part="title">${this.title || htmlSlot("title")}</strong>
        ${this.content || htmlSlot()}
      </div>
      ${
        !this.hideClose && this.variant !== "blockquote"
          ? html`<div part="close" tabindex=0 @click="${this.close}">${iconXmark()}</div>`
          : ""
      }
    </div>`,
      htmlStyle(this.variant === "light" ? lightStyles[color] : darkStyles[color]),
    ];
  }

  close() {
    this.remove();
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  protected firstUpdated() {
    if (this.autoclose) {
      setTimeout(() => this.close(), this.autoclose);
    }
  }

  static alert(root: HTMLElement, option: Partial<Alert>): Alert {
    const ai = new this();
    Object.assign(ai, option);
    root.appendChild(ai);
    return ai;
  }
}

export default Alert;

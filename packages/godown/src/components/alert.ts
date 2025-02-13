import { attr, constructCSSObject, godown, htmlSlot, htmlStyle, styles, toVar } from "@godown/element";
import iconCheckAltCircle from "@godown/f7-icon/icons/checkmark-alt-circle.js";
import iconExclamationCircle from "@godown/f7-icon/icons/exclamationmark-circle.js";
import iconInfoCircle from "@godown/f7-icon/icons/info-circle.js";
import iconLightbulb from "@godown/f7-icon/icons/lightbulb.js";
import iconQuestionCircle from "@godown/f7-icon/icons/question-circle.js";
import iconSlashCircle from "@godown/f7-icon/icons/slash-circle.js";
import iconXmarkCircle from "@godown/f7-icon/icons/xmark-circle.js";
import iconXmark from "@godown/f7-icon/icons/xmark.js";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../core/global-style.js";

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
  () => ":host",
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
 * @fires close - Fires when the alert is closed.
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host,
  :where(:host([contents]) [part="root"]) {
    ${cssScope}--border-width: .075em;
    ${cssScope}--blockquote-width: .2em;
    ${cssScope}--blockquote-background: transparent;
    ${cssScope}--gap: .5em;
    display: block;
  }

  [part="root"] {
    color: var(${cssScope}--color, currentColor);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr;
    border-color: currentColor;
    border-radius: inherit;
    border-style: solid;
    border-width: var(${cssScope}--border-width);
    padding: var(${cssScope}--gap);
    background: var(${cssScope}--background);
  }

  [variant="blockquote"] {
    border-radius: 0;
    border-width: 0;
    border-left-width: var(${cssScope}--blockquote-width);
    background: var(${cssScope}--blockquote-background);
  }

  [part~="icon"] {
    display: grid;
    align-items: center;
    height: 2em;
  }

  .start svg {
    margin-inline-end: var(${cssScope}--gap);
  }

  .end svg {
    margin-inline-start: var(${cssScope}--gap);
  }

  svg {
    width: 1.25em;
    height: 1.25em;
  }

  [part="content"] {
    grid-row: span 2 / span 2;
  }
`)
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
  variant: "blockquote" | "dark" = "dark";

  protected render(): TemplateResult<1> {
    const color = calls[this.call]?.color || this.color;
    const icon = this.call ? calls[this.call].icon() : htmlSlot("icon");
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        <div
          part="icon"
          class="start"
        >
          ${icon}
        </div>
        <div part="content">
          <strong part="title">${this.title || htmlSlot("title")}</strong>
          ${this.content || htmlSlot()}
        </div>
        ${this.hideClose || this.variant === "blockquote"
          ? ""
          : html`
              <div
                part="icon close"
                class="end"
                tabindex="0"
                @click="${this.close}"
              >
                ${iconXmark()}
              </div>
            `}
        ${htmlStyle(darkStyles[color])}
      </div>
    `;
  }

  close(): void {
    this.remove();
    this.dispatchCustomEvent("close", undefined, { bubbles: true });
  }

  protected firstUpdated(): void {
    if (this.autoclose) {
      this.timeouts.add(setTimeout(() => this.close(), this.autoclose));
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
export { Alert };

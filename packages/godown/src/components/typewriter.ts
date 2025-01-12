import { attr, godown, htmlSlot, random, styles } from "@godown/element";
import { type PropertyValueMap, type TemplateResult, css, html } from "lit";
import { property, query, state } from "lit/decorators.js";

import { GlobalStyle, scopePrefix } from "../core/global-style.js";

const protoName = "typewriter";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Typewriter} renders a typewriter effect to text.
 *
 * @category effect
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--cursor-width: .05em;
  }

  :host,
  :host([contents]) [part="root"] {
    display: inline-block;
  }

  i {
    border-right: var(${cssScope}--cursor-width) solid;
    margin-left: 0.02em;
    animation: s 1.5s steps(1) infinite;
  }

  @keyframes s {
    0% {
      border-color: currentColor;
    }
    50% {
      border-color: transparent;
    }
  }

  slot {
    display: none;
  }
`)
class Typewriter extends GlobalStyle {
  /**
   * Raw text.
   */
  @property()
  content = "";

  /**
   * If true, hide the cursor
   */
  @property({ type: Boolean })
  ended = false;

  /**
   * Maximum random time.
   */
  @property({ type: Number })
  max = 100;

  /**
   * Minimum random time.
   */
  @property({ type: Number })
  min = 50;

  /**
   * Fixed time.
   */
  @property({ type: Number })
  delay = 0;

  /**
   * The index at the beginning.
   */
  @property({ type: Number })
  index = 0;

  @state()
  contentInternal = "";

  protected timeoutID: number;

  @query("i")
  protected _i: HTMLElement;

  /**
   * {@linkcode Typewriter.content} length.
   */
  get len(): number {
    return this.content.length;
  }

  protected render(): TemplateResult<1> {
    return html`<div part="root" ${attr(this.observedRecord)}>
      ${htmlSlot()} ${this.contentInternal}
      <i part="cursor" ?hidden="${this.ended}"></i>
    </div>`;
  }

  protected firstUpdated(): void {
    this.content ||= this._slot?.assignedNodes()[0]?.textContent.trim() || "";
    if (!this.ended && this.len) {
      this.write();
    }
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    if (changedProperties.has("index")) {
      this.dispatchEvent(new CustomEvent(this.index === this.len ? "done" : "write", { detail: this.contentInternal }));
    }
  }

  write(at: number = this.index): void {
    this.contentInternal = this.content.slice(0, at + 1);
    const timeout = this.delay || random(this.max, this.min);
    this.timeoutID = setTimeout(() => {
      const nx = at + 1;
      if (nx <= this.len) {
        this.index = nx;
        this.write();
      }
    }, timeout);
  }

  stop(): void {
    clearTimeout(this.timeoutID);
  }

  end(): void {
    this.ended = true;
  }
}

export default Typewriter;
export { Typewriter };

import { css, type CSSResultGroup, html, property, type PropertyValueMap, state } from "../../.deps.js";
import { define } from "../../decorators/define.js";
import { ifValue } from "../../lib/directives.js";
import { htmlSlot, type HTMLTemplate } from "../../lib/templates.js";
import { deepQuerySelectorAll } from "../../lib/utils.js";
import { createScope, cssvarValues, GodownElement } from "../../supers/root.js";

const defineName = "tabs";

const cssvarScope = createScope(defineName);

/**
 * {@linkcode GodownTab} used to support multiple tab.
 *
 * Inspired by Next-ui.
 */
@define(defineName)
export class Tabs extends GodownElement {
  /**
   * Active slot name.
   */
  @property() index = "";
  /**
   * Default slot name.
   */
  @property() def = "";
  /**
   * Align type.
   */
  @property() align = "start";
  /**
   * Header texts or slot names, if headers is a zero value, it is taken from the {@linkcode Tabs.contents}.
   */
  @state() headers: string[] | void;
  /**
   * Contents slot names.
   */
  @state() contents: string[];

  static styles = [
    GodownElement.styles,
    css`
      :host {
        ${cssvarScope}--background: var(${cssvarValues.main});
        ${cssvarScope}--background-active: rgb(var(${cssvarValues.textRGB}) / 18%);
        ${cssvarScope}--radius: .25em;
        ${cssvarScope}--cursor: default;
        background: var(${cssvarScope}--background);
        display: block;
        color: var(${cssvarValues.text});
      }

      nav {
        display: grid;
        grid-auto-flow: column;
        gap: 0.25em;
        position: relative;
        border-radius: inherit;
      }

      section {
        white-space: nowrap;
        border-radius: inherit;
        padding: 0.15em 0.2em;
        cursor: var(${cssvarScope}--cursor);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #slider {
        height: 100%;
        position: absolute;
        padding: 0;
        background: var(${cssvarScope}--background-active);
        transform: translateX(-50%);
        transition: all 180ms ease 0s;
        z-index: 0;
      }
    `,
  ] as CSSResultGroup;

  protected render(): HTMLTemplate {
    const headers = (this.headers || this.contents).map((value) => {
      return html`<section
        class="${ifValue(this.index === value, "active")}"
        @click="${() => {
          this.select(value, true);
        }}"
      >
        ${this.headers ? htmlSlot(value) : value}
      </section>`;
    });
    return html`
      <nav style="justify-content:${this.align}">
        ${headers}
        <section id="slider"></section>
      </nav>
      ${htmlSlot(this.index || this.def)}
    `;
  }

  protected updated(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has("index")) {
      // Move slider.
      const active = this.shadowRoot.querySelector<HTMLElement>("section.active");
      const slider = this.shadowRoot.querySelector<HTMLElement>("#slider");
      if (active) {
        this.dispatchEvent(new CustomEvent("select", { detail: this.index }));
        slider.style.width = `${active.clientWidth}px`;
        slider.animate([{ left: `${active.offsetLeft + active.clientWidth / 2}px` }], {
          duration: 180,
          fill: "forwards",
        });
      } else {
        slider.style.width = "0";
      }
    }
  }

  /**
   * Select one tab.
   * @param s New index.
   * @param callSync if true, update all same elements (headers contains s).
   */
  select(s: string, callSync = false) {
    if (callSync) {
      const elements = deepQuerySelectorAll<this>(this.tagName, document.body);
      for (const e of elements) {
        if ((e.headers || e.contents).includes(s)) {
          e.select(s);
        }
      }
      return;
    }
    this.index = s;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.def) {
      this.def = this.slottedNames[0] || "";
    }
    if (!this.index && this.def) {
      this.index = this.def;
    }
    this.getTabs();
  }

  /**
   * Update content controls (this.headers, this.contents).
   */
  getTabs() {
    this.contents = this.slottedNames;
  }
}

export default Tabs;

declare global {
  interface HTMLElementTagNameMap {
    "tab-group": Tabs;
    "g-tabs": Tabs;
  }
}

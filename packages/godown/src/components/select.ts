import { HandlerEvent } from "@godown/element";
import { godown } from "@godown/element/decorators/godown.js";
import { part } from "@godown/element/decorators/part.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import svgCaretDown from "@godown/f7-icon/icons/chevron-down.js";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import Input from "./input.js";

function contain(a: string, b: string): boolean {
  return a && b && a.toLowerCase().includes(b.toLowerCase());
}

function betweenAt(i: number, s: string, c: string) {
  const start = s.slice(0, i).lastIndexOf(c) + 1 || 0;
  const end = s.indexOf(c, i) || s.length;
  return s.slice(start, end);
}

function updateChecked(element: HTMLElement | null, operation: 0 | 1) {
  if (element) {
    const name = "checked";
    if (operation) {
      element.setAttribute(name, "");
    } else {
      element.removeAttribute(name);
    }
  }
}

const protoName = "select";

/**
 * {@linkcode Select} is similar to `<select>`.
 *
 * Elements with the value attribute/property can be used as options.
 *
 * The checked attribute will be added to the selected element.
 *
 * Multi-selected state looks the same as single-selected.
 *
 * Input will filter the element.
 *
 * @slot - Options.
 * @category input
 */
@godown(protoName)
@styles(
  css`
    [part="input"] {
      text-overflow: ellipsis;
    }

    [part="content"] {
      position: absolute;
      width: 100%;
    }

    [direction="bottom"] {
      top: 100%;
    }

    [direction="top"] {
      bottom: 100%;
    }
  `,
)
class Select extends Input {
  // @ts-ignore
  value: string | string[];

  /**
   * Selected texts.
   */
  @property()
  text: string;

  @part("content")
  protected _content: HTMLElement;

  @property()
  direction: "top" | "bottom" | undefined;

  @property({ type: Boolean })
  multiple: boolean;

  @property({ type: Boolean })
  visible: boolean;

  @state()
  protected autoDirection: "top" | "bottom" = "bottom";

  protected lastChecked: HTMLElement;
  protected defaultText: string;
  protected defaultChecked: HTMLElement[];
  private _store: { value: string; text: string; }[] = [];

  protected render() {
    return html`<div part="root" class="input-field"> 
    ${[
      this._renderPrefix(),
      html`<input
        part="input"
        dir="${ifDefined(this.dir)}"
        id="${this.makeId}"
        .value="${this.text}"
        type="${this.type}"
        placeholder="${this.placeholder || nothing}"
        ?autofocus="${this.autofocus}"
        autocapitalize="${this.autocapitalize || nothing}"
        autocomplete="${this.autocomplete || nothing}"
        ?disabled="${this.disabled}"
        @focus="${this._handleFocus}"
        @input="${this._handleInput}"
      >`,
      html`<label for="${this.makeId}" part="suffix">
        <i part="space"></i><i part="icon">${svgCaretDown()}</i><i part="space"></i>
      </label>`,
      html`<label for="${this.makeId}" part="content" 
      style="visibility:${this.visible ? "visible" : "hidden"}"
      direction="${this.direction || this.autoDirection}">${htmlSlot()}</label>`,
    ]}
    </div>`;
  }

  protected _handleFocus() {
    if (!this.direction) {
      const { top, bottom } = this.getBoundingClientRect();
      if (window.innerHeight - bottom < this._content.clientHeight && top > this._content.clientHeight) {
        this.autoDirection = "top";
      } else {
        this.autoDirection = "bottom";
      }
    }
    this.visible = true;
  }

  protected firstUpdated() {
    this.events.add(this._content, "click", (e: HandlerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { target } = e;
      const value = this.optionValue(target);
      if (value) {
        const operation = this.select(value, target.textContent);
        if (!this.multiple) {
          updateChecked(this.lastChecked, 0);
        }
        updateChecked(target, operation);
        this.lastChecked = target;
      }
      this._input.focus();
    });
    this.events.add(document, "click", (e: HandlerEvent) => {
      // e.preventDefault();
      e.stopPropagation();
      const composed1 = e.composedPath()[0] as HTMLElement;
      if (composed1 && !this.shadowRoot.contains(composed1)) {
        this.blur();
      }
    });
  }

  protected _connectedInit() {
    if (!this.value) {
      const checked = [...this.querySelectorAll<HTMLElement>("[checked]")];
      const list = this.multiple
        ? checked
        : checked.length
        ? [this.lastChecked = checked[0]]
        : [];
      list.forEach((element: HTMLElement) => {
        const operation = this.select(this.optionValue(element), element.textContent);
        updateChecked(element, operation);
      });

      this.default = this.value;
      this.defaultText = this.text;
      this.defaultChecked = checked;
    }
    if (!this.text) {
      this.text = "";
    }
  }

  reset(): void {
    this.value = this.default;
    this.text = this.defaultText;
    this.querySelectorAll<HTMLElement>("[checked]").forEach(element => updateChecked(element, 0));
    this.defaultChecked.forEach(element => updateChecked(element, 1));
  }

  select(value: string, text?: string) {
    text ||= value;
    let operation: 0 | 1 = 0;
    if (this.multiple) {
      const i = this._store.findIndex(s => s.value === value);
      if (i > -1) {
        this._store.splice(i, 1);
      } else {
        this._store.push({ value, text });
        operation = 1;
      }
      this.value = this._store.map(s => s.value);
      this.text = this._store.map(s => s.text).join(", ");
    } else {
      if (this.value === value) {
        this.value = "";
        this.text = "";
      } else {
        this.value = value;
        this.text = text;
        operation = 1;
      }
    }
    this.dispatchEvent(new CustomEvent("change", { detail: this.namevalue() }));
    this.filter();
    return operation;
  }

  filter(query?: string) {
    query = query?.trim();
    [...this.children].forEach((element: HTMLElement) => {
      this.filterCallback(
        element,
        !query
          || contain(this.optionValue(element), query)
          || contain(element.textContent, query),
        query,
      );
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterCallback(element: HTMLElement, match: boolean, query: string) {
    element.style.display = match ? "" : "none";
  }

  protected _handleInput(e: HandlerEvent<HTMLInputElement>) {
    e.stopPropagation();
    if (this.compositing) {
      return;
    }
    const s = this._input.value;
    this.filter(this.multiple ? betweenAt(this._input.selectionStart, s, ",") : s);
    this.dispatchEvent(new CustomEvent("input", { detail: this.namevalue() }));
  }

  focus(options?: FocusOptions) {
    this._input.focus(options);
    this.visible = true;
  }

  blur() {
    this._input.blur();
    this.visible = false;
    super.blur();
  }

  optionValue(option: HTMLElement): string {
    return (option as any).value || option.getAttribute("value") || "";
  }
}

export default Select;

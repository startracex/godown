import { type HandlerEvent, attr, godown, htmlSlot, part, styles } from "@godown/element";
import svgCaretDown from "@godown/f7-icon/icons/chevron-down.js";
import { type TemplateResult, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import Input from "./input.js";
import { cssGlobalVars } from "../core/global-style.js";
import { DirectionCardinalY, directionOutsetPlace } from "../core/direction.js";

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
 * @fires input - Fires when the input value changes.
 * @fires change - Fires when the input value changes.
 * @fires select - Fires when select an option.
 * @slot - Options.
 * @category input
 */
@godown(protoName)
@styles(
  directionOutsetPlace,
  css`
    :host(:focus-within),
    .outline {
      ${cssGlobalVars.input}-outline-color: var(${cssGlobalVars.active});
    }

    [part="input"] {
      text-overflow: ellipsis;
    }

    [part="content"] {
      position: absolute;
      width: 100%;
      visibility: hidden;
    }

    [visible] [part="content"] {
      visibility: visible;
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
  direction: DirectionCardinalY;

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Boolean })
  visible = false;

  @state()
  protected autoDirection: DirectionCardinalY = "bottom";

  protected lastChecked: HTMLElement;
  protected defaultText: string;
  protected defaultChecked: HTMLElement[];
  private __store: { value: string; text: string }[] = [];

  get observedRecord(): Record<string, any> {
    return {
      ...super.observedRecord,
      direction: this.direction || this.autoDirection,
    };
  }

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        class="input-field"
      >
        ${[
          this._renderPrefix(),
          html`
            <input
              part="input"
              type="${this.type}"
              .value="${this.text}"
              ?autofocus="${this.autofocus}"
              ?disabled="${this.disabled}"
              autocapitalize="${this.autocapitalize || nothing}"
              autocomplete="${this.autocomplete || nothing}"
              placeholder="${this.placeholder || nothing}"
              id="${this.makeId}"
              @focus="${this._handleFocus}"
              @input="${this._handleInput}"
            />
          `,
          html`
            <label
              for="${this.makeId}"
              part="suffix"
            >
              <i part="icon">${svgCaretDown()}</i>
            </label>
          `,
          html`
            <label
              for="${this.makeId}"
              part="content"
              direction-outset-place
            >
              ${htmlSlot()}
            </label>
          `,
        ]}
      </div>
    `;
  }

  protected _handleFocus(): void {
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

  protected firstUpdated(): void {
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

  protected _connectedInit(): void {
    if (!this.value) {
      const checked = [...this.querySelectorAll<HTMLElement>("[checked]")];
      const list = this.multiple ? checked : checked.length ? [(this.lastChecked = checked[0])] : [];
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
    this.querySelectorAll<HTMLElement>("[checked]").forEach((element) => updateChecked(element, 0));
    this.defaultChecked.forEach((element) => updateChecked(element, 1));
  }

  select(value: string, text?: string): 0 | 1 {
    text ||= value;
    let operation: 0 | 1 = 0;
    if (this.multiple) {
      const i = this.__store.findIndex((s) => s.value === value);
      if (i > -1) {
        this.__store.splice(i, 1);
      } else {
        this.__store.push({ value, text });
        operation = 1;
      }
      this.value = this.__store.map((s) => s.value);
      this.text = this.__store.map((s) => s.text).join(", ");
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
    this.dispatchEvent(new CustomEvent("select", { detail: this.value, composed: true }));
    this.filter();
    return operation;
  }

  filter(query?: string): void {
    query = query?.trim();
    [...this.children].forEach((element: HTMLElement) => {
      this.filterCallback(
        element,
        !query || contain(this.optionValue(element), query) || contain(element.textContent, query),
        query,
      );
    });
  }

  filterCallback(element: HTMLElement, match: boolean, query: string): void {
    element.style.display = match ? "" : "none";
  }

  protected _handleInput(e: HandlerEvent<HTMLInputElement>): void {
    e.stopPropagation();
    if (this.compositing) {
      return;
    }
    const s = this._input.value;
    this.filter(this.multiple ? betweenAt(this._input.selectionStart, s, ",") : s);
    this.dispatchEvent(new CustomEvent("input", { detail: this.value, composed: true, bubbles: true }));
    this.dispatchEvent(new CustomEvent("change", { detail: this.value, composed: true }));
  }

  focus(options?: FocusOptions): void {
    this._input.focus(options);
    this.visible = true;
  }

  blur(): void {
    this._input.blur();
    this.visible = false;
    super.blur();
  }

  optionValue(option: HTMLElement): string {
    return (option as any).value || option.getAttribute("value") || "";
  }
}

export default Select;
export { Select };

import { type HandlerEvent, attr, godown, htmlSlot, queryPart, styles } from "@godown/element";
import svgCaretDown from "../../internal/icons/caret-down.js";
import { type TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import Input from "../input/component.js";
import { hidePopover, showPopover } from "../../internal/popover.js";

function updateSelected(element: HTMLElement | null, operation: 0 | 1) {
  if (element) {
    const name = "selected";
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
 * @fires input - Fires when the input value changes.
 * @fires change - Fires when the input value changes.
 * @fires select - Fires when select an option.
 * @slot - Options.
 * @category input
 */
@godown(protoName)
@styles(css`
  [part="root"] {
    position: relative;
    anchor-name: --select;
  }

  label {
    display: contents;
  }

  [part="popover"] {
    border: 0;
    width: 100%;
    background: none;
    position-anchor: --select;
    position-area: bottom center;
    position-try-fallbacks: flip-block;
  }

  [part="input"] {
    text-overflow: ellipsis;
  }

  @supports not (position-area: top) {
    [part="popover"] {
      left: 0;
      top: 100%;
      display: none;
      position: absolute;
    }
  }
`)
class Select extends Input {
  @property()
  text: string;

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Boolean })
  noEdit = false;

  @property({ type: Array })
  values: {
    value: string;
    label?: string;
  }[] = [];

  @queryPart("popover")
  _popover: HTMLElement;

  protected lastChecked: HTMLElement;
  protected defaultText: string;
  protected optionsVisible = false;

  protected render(): TemplateResult<1> {
    const inputNoEdit = this.noEdit || this.disabled;
    return html`
      <label
        part="root"
        ${attr(this.observedRecord)}
      >
        ${[
          this._renderPrefix(),
          this.noEdit
            ? html`
                <input style="position: absolute;inset: 0;opacity: 0;" />
              `
            : "",
          html`
            <input
              part="input"
              .value="${this.text}"
              ?autofocus="${this.autofocus}"
              ?disabled="${inputNoEdit}"
              autocapitalize="${this.autocapitalize || nothing}"
              autocomplete="${this.autocomplete || nothing}"
              placeholder="${this.placeholder || nothing}"
              @input="${inputNoEdit ? null : this._handleInput}"
              @change="${inputNoEdit ? null : this._handleChange}"
            />
          `,
          this._renderSuffix(),
        ]}
        <div
          part="popover"
          popover="${CSS.supports("position-area:top") ? "manual" : nothing}"
        >
          ${htmlSlot()}
        </div>
      </label>
    `;
  }

  protected _renderSuffix(): TemplateResult<1> {
    return html`
      <i part="suffix">${htmlSlot("suffix", svgCaretDown())}</i>
    `;
  }

  protected firstUpdated(): void {
    this.events.add(this._slot, "click", (e: HandlerEvent<HTMLOptionElement>) => {
      const { target } = e;
      if (target.tagName !== "OPTION") {
        return;
      }
      const { label, value } = target;
      const operation = this.select(value, label);
      if (!this.multiple) {
        updateSelected(this.lastChecked, 0);
        this.hideOptions();
      }
      updateSelected(target, operation);
      this.lastChecked = target;
    });
  }

  protected _connectedInit(): void {
    this.default = this.value ??= "";
    this.defaultText = this.text ??= "";
    this.events.add(this, "focus", this.showOptions);
  }

  reset(): void {
    this.value = this.default;
    this.text = this.defaultText;
  }

  select(value: string, label: string): 0 | 1 {
    label ||= value;
    let operation: 0 | 1 = 0;
    const i = this.values.findIndex((s) => s.value === value);
    if (i > -1) {
      this.values.splice(i, 1);
    } else {
      this.values.push({ value, label });
      operation = 1;
    }
    this.checkValues();
    this.value = this.values.map((s) => s.value).join(",");
    this.text = this.values.map((s) => s.label).join(", ");
    this.dispatchCustomEvent("select", this.value);
    return operation;
  }

  checkValues(): void {
    if (!this.multiple && this.values.length > 1) {
      this.values.splice(0, this.values.length - 1);
      this.requestUpdate();
    }
  }

  showOptions(): void {
    if (this.optionsVisible) {
      return;
    }
    showPopover(this._popover);
    const listener = (e) => {
      if (!this.contains(e.target)) {
        this.hideOptions();
        this.events.remove(document, "click", listener);
      }
    };
    this.events.add(document, "click", listener);
    this.optionsVisible = true;
  }

  hideOptions(): void {
    if (!this.optionsVisible) {
      return;
    }
    hidePopover(this._popover);
    this.optionsVisible = false;
  }

  focus(options?: FocusOptions): void {
    super.focus();
    this._input.focus(options);
    this.showOptions();
  }

  blur(): void {
    super.blur();
    this._input.blur();
    hidePopover(this._popover);
  }
}

export default Select;
export { Select };

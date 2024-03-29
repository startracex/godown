import { css, type CSSResultGroup, html, property, query } from "../../.deps.js";
import { define } from "../../decorators/define.js";
import { htmlSlot, type HTMLTemplate } from "../../lib/templates.js";
import { each } from "../../lib/utils.js";
import { GodownElement } from "../../supers/root.js";

/**
 * {@linkcode Form} gets all the names and actual values of the child element.
 */
@define("form")
export class Form<T extends object = object> extends GodownElement {
  @property() name = "";
  @property({ type: Object }) value = {} as T;

  nameValue = () => this.namevalue();
  /**
   * Form enctype.
   */
  @property() enctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" = "multipart/form-data";

  @query("form") _form: HTMLFormElement;

  static styles = [
    css`
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
      }

      main {
        display: flex;
        flex-direction: column;
      }
    `,
  ] as CSSResultGroup;

  protected render(): HTMLTemplate {
    return html`<form enctype="${this.enctype}">
      ${htmlSlot("pre")}
      <main>${htmlSlot()}</main>
      ${htmlSlot("suf")}
    </form>`;
  }

  reset() {
    each(this._form, (node: HTMLFormElement | Form) => {
      if (node.reset) {
        node.reset();
      }
    });
    const form: any = document.createElement("form");
    for (const slot of this.shadowRoot.querySelectorAll("slot")) {
      for (const i of slot.assignedNodes() as any) {
        if (i.reset) {
          i.reset();
        }
        form.appendChild(i.cloneNode(true));
      }
    }
    form.reset();
    for (const slot of this.shadowRoot.querySelectorAll("slot")) {
      for (const i of slot.assignedNodes() as any) {
        if (i.name && form[i.name]) {
          i.value = form[i.name].value;
        }
      }
    }
    form.remove();
  }

  namevalue(enctype = this.enctype): [string, Record<string, any>] {
    const result = {};
    const tempForm = document.createElement("form");
    tempForm.enctype = enctype;
    for (const slot of this.shadowRoot.querySelectorAll("slot")) {
      for (const i of slot.assignedNodes() as any) {
        if (i.namevalue) {
          const [name, value] = i.namevalue();
          if (name) {
            result[name] = value;
          }
        } else {
          tempForm.appendChild(i.cloneNode(true));
        }
      }
    }
    const formData = new FormData(tempForm);
    for (const [key, value] of formData) {
      result[key] = value;
    }
    each(this._form, (node: any) => {
      if (node.namevalue) {
        const [name, value] = node.namevalue();
        if (name) {
          result[name] = value;
        }
      }
    });
    tempForm.remove();
    return [this.name, result];
  }

  FormData(): FormData {
    const temp = {};
    const tempForm = document.createElement("form");
    tempForm.enctype = this.enctype;
    for (const slot of this._slots) {
      for (const i of slot.assignedNodes() as any) {
        if (i.FormData) {
          for (const [key, value] of i.FormData()) {
            temp[key] = value;
          }
        } else {
          tempForm.appendChild(i.cloneNode(true));
        }
      }
    }
    const formData = new FormData(tempForm);
    each(this._form, (node: any) => {
      if (node.namevalue) {
        const [name, value] = node.namevalue();
        if (name) {
          formData.append(name, value);
        }
      }
    });
    for (const key in temp) {
      formData.append(key, temp[key]);
    }
    tempForm.remove();
    return formData;
  }
}
export default Form;

declare global {
  interface HTMLElementTagNameMap {
    "base-form": Form;
    "g-form": Form;
  }
}

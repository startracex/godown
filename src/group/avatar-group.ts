import { append, css, define, DisableWarning, html, property } from "../deps.js";
import AvatarA from "../items/avatar-a.js";
import GroupSTD from "./std.js";
import { htmlSlot } from "../tmpl.js";

@define("avatar-group")
export class AvatarGroup extends GroupSTD {
  @property({ type: Number }) max = 0;
  @property({ type: Number }) more = 0;
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }

    div {
      display: contents;
    }
  `;

  render() {
    const cssStr = `slot::slotted(:nth-of-type(n + ${(this.max || 0) + 1})) {display: none;}`;
    return html`${htmlSlot()}
      <style>
        ${cssStr}
      </style>
      ${this.render_more()}`;
  }

  render_more() {
    if (this.more > 0) {
      const aa = new AvatarA();
      aa.more = this.more;
      return aa;
    }
  }

  firstUpdated() {
    if (!this.more && this.assigned.length > this.max) {
      this.more = this.assigned.length - this.max;
    }
  }

  append(args = new AvatarA()) {
    if (this.max && this.assigned.length == this.max) {
      this.assigned.pop().style.display = "none";
      append(this, args);
      this.assigned.pop().style.display = "none";
      this.more = 2;
    } else if (this.max && this.assigned.length > this.max) {
      append(this, args);
      this.assigned.pop().style.display = "none";
      this.more += 1;
    } else {
      append(this, args);
    }
  }

  subtract() {
    if (this.more == 2) {
      this.assigned.pop().style.display = "";
      this.more = 0;
      return;
    } else if (this.more > 0) {
      this.more -= 1;
    }
    if (this.assigned.length) this.assigned.pop().remove();
  }
}

DisableWarning(AvatarGroup);

export default AvatarGroup;

declare global {
  interface HTMLElementTagNameMap {
    "avatar-group": AvatarGroup;
  }
}

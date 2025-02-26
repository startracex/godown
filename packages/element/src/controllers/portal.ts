import { type ReactiveController, type ReactiveControllerHost, render } from "lit";

/**
 * PortalController the controller creates and renders portal elements.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement {
 *   private portalController = new PortalController(
 *       this,
 *       () => this.open ? html`<div>Portal Content</div>` : null,
 *       () => document.body.appendChild(document.createElement("div"))
 *     );
 *   }
 *
 *   *@property({ type: Boolean })*
 *   open = false;
 *
 *   render() {
 *     return html`<button @click=${this.toggle}>Toggle Portal</button>`;
 *   }
 *
 *   toggle() {
 *     this.open = !this.open;
 *   }
 * }
 * ```
 */
export class PortalController<E extends HTMLElement = HTMLElement> implements ReactiveController {
  host: ReactiveControllerHost;
  root: E;
  setup: () => E;
  render: (root?: E) => any;
  value: any;

  constructor(
    host: ReactiveControllerHost,
    renderRootContent: (root?: E) => any,
    setupRoot?: () => E,
  ) {
    (this.host = host).addController(this);
    this.render = renderRootContent;
    this.setup = setupRoot;
    this.root;
  }

  hostConnected(): void {
    this.root = this.setup?.() || document.body as E;
  }

  hostUpdated(): void {
    const value = this.render(this.root);
    if (value === this.value) {
      return;
    }
    render(value, this.root, { host: this.host });
    this.value = value;
  }

  hostDisconnected(): void {
    if (this.root && this.root !== document.body) {
      this.root.remove();
      this.root = null;
    }
  }
}

export default PortalController;

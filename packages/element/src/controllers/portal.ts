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
  cleanup: (root: E) => void;
  render: (root?: E) => any;
  value: any;

  constructor(
    host: ReactiveControllerHost,
    renderRootContent: (root?: E) => any,
    setupRoot: () => E = () => document.body as E,
    cleanupRoot: (root: E) => void = (root) => {
      if (document.body !== root) {
        root.remove();
      }
    },
  ) {
    (this.host = host).addController(this);
    this.render = renderRootContent;
    this.setup = setupRoot;
    this.cleanup = cleanupRoot;
  }

  hostConnected(): void {
    this.root = this.setup();
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
    if (this.root) {
      this.cleanup(this.root);
      this.root = null;
    }
  }
}

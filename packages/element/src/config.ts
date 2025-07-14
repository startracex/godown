import { dash } from "sharekit";

const separator = "-";

export class GodownConfig {
  assign: null | Record<PropertyKey, any> = null;
  prefix = "godown";
  suffix = "";
  components: Map<string, CustomElementConstructor> = new Map();
  registry: CustomElementRegistry = customElements;

  tag(origin: string): string {
    return dash(this.prefix + separator + origin + separator + this.suffix);
  }

  define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void {
    this.registry.define(name, constructor, options);
    this.components.set(name, constructor);
  }

  get(name: string): CustomElementConstructor | undefined {
    return this.registry.get(name);
  }

  getName(constructor: CustomElementConstructor): string | null {
    const { getName } = this.registry;
    if (getName) {
      return getName(constructor);
    }
    return [...this.components.entries()].find(([, v]) => v === constructor)?.[0] || null;
  }

  whenDefined(name: string): Promise<CustomElementConstructor> {
    return this.registry.whenDefined(name);
  }

  upgrade(root: Node): void {
    this.registry.upgrade(root);
  }
}

export default GodownConfig;

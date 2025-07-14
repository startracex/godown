export class IconSet<F extends (...args: any) => any> {
  private static readonly DEFAULT_VARIANT = "default";

  private inner = new Map<string, Map<string, F>>();
  private variantMapping = new Map<string, string>();
  private variantPrefer = IconSet.DEFAULT_VARIANT as string;

  private _define(name: string, variant: string, renderer: F): void {
    let iconSet = this.inner.get(variant);
    if (!iconSet) {
      iconSet = new Map<string, F>();
      this.inner.set(variant, iconSet);
    }
    iconSet.set(name, renderer);
  }

  define(name: string, renderer: F): void;
  define(name: string, variant: string, renderer: F): void;
  define(name: string, variantOrRenderer: string | F, renderer?: F): void {
    if (renderer) {
      this._define(name, variantOrRenderer as string, renderer);
    } else {
      this._define(name, this.variantPrefer, variantOrRenderer as F);
    }
  }

  get(name: string, variant: string): F | undefined {
    const actualVariant = this.computeVariant(variant);
    if (actualVariant !== undefined) {
      const matchedIcon = this.inner.get(actualVariant)?.get(name);
      if (matchedIcon !== undefined) {
        return matchedIcon;
      }
    }

    const preferred = this.inner.get(this.variantPrefer)?.get(name);
    if (preferred !== undefined) {
      return preferred;
    }

    return this.get(name, this.variantPrefer);
  }

  variant(from: string, to: string): void {
    this.variantMapping.set(from, to);
  }

  prefer(variant: string | null): void {
    this.variantPrefer = variant ? variant : IconSet.DEFAULT_VARIANT;
  }

  private computeVariant(variant: string): string | undefined {
    if (!this.variantMapping.size) {
      return variant;
    }

    let current = variant;
    while (true) {
      const next = this.variantMapping.get(current);
      if (next === undefined) {
        return current;
      }
      if (next === variant) {
        return undefined;
      }
      current = next;
    }
  }
}

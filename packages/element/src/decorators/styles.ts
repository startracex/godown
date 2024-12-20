import type { CSSResultGroup } from "lit";

type LitStyles = CSSResultGroup | CSSResultGroup[];

/**
 * Decorator that adds styles to a component.
 *
 * Tracks the styles of a component and extends them with the styles of its super classes.
 *
 * @param s The styles to add to the component.
 */
export const styles = (...s: LitStyles[]) => {
  return (constructor: { styles?: LitStyles; }): void => {
    const protoStyles: CSSResultGroup[] = [];

    for (
      let superClass: typeof constructor = Object.getPrototypeOf(constructor);
      superClass.styles;
      superClass = Object.getPrototypeOf(superClass)
    ) {
      protoStyles.push(superClass.styles);
    }

    constructor.styles = [...protoStyles, ...s];
  };
};

export default styles;

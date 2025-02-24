export function deepQuerySelectorAll<E extends Element = HTMLElement>(
  this: any,
  selectors: string,
  root: E | ParentNode = this,
): E[] {
  if (!root || !selectors) {
    return [];
  }

  const result = new Set<E>();
  if (root instanceof Element && root.shadowRoot) {
    deepQuerySelectorAll<E>(selectors, root.shadowRoot).forEach((el) => result.add(el));
  }

  root.querySelectorAll<E>(selectors).forEach((el) => result.add(el));

  for (const child of root.children) {
    deepQuerySelectorAll<E>(selectors, child).forEach((el) => result.add(el));
  }

  return Array.from(result);
}

export function deepQuerySelector<E extends Element = HTMLElement>(
  this: any,
  selectors: string,
  root: E | ParentNode = this,
): E | null {
  if (!root || !selectors) {
    return null;
  }

  let result: E | null;
  if (root instanceof Element && root.shadowRoot) {
    result = deepQuerySelector<E>(selectors, root.shadowRoot);
    if (result) {
      return result;
    }
  }

  result = root.querySelector<E>(selectors);
  if (result) {
    return result;
  }

  for (const child of root.children) {
    result = deepQuerySelector<E>(selectors, child);
    if (result) {
      return result;
    }
  }
  return null;
}

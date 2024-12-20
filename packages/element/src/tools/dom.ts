export function deepQuerySelectorAll<E extends Element = HTMLElement>(
  selectors: string,
  root: E | ParentNode = document.body,
): E[] {
  const result: E[] = [];

  if (!root || !selectors) {
    return result;
  }

  if ((root as E).shadowRoot) {
    result.push(...deepQuerySelectorAll<E>(selectors, (root as E).shadowRoot));
  }

  const a = root.querySelectorAll<E>(selectors);
  result.push(...Array.from(a));

  for (const child of root.children) {
    result.push(...deepQuerySelectorAll<E>(selectors, child));
  }

  return [...new Set(result)];
}

export function deepQuerySelector<E extends Element = HTMLElement>(
  selectors: string,
  root: E | ParentNode = document.body,
): E {
  if (!root || !selectors) {
    return null;
  }
  if ((root as E).shadowRoot) {
    return deepQuerySelector<E>(selectors, (root as E).shadowRoot);
  }
  const a = root.querySelector<E>(selectors);
  if (a) {
    return a;
  }
  for (const child of root.children) {
    const b = deepQuerySelector<E>(selectors, child);
    if (b) {
      return b;
    }
  }
  return null;
}

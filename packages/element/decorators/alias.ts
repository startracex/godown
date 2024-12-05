const resolve = (value, defaults) => {
  if (value) {
    return value;
  }
  if (value === undefined) {
    return defaults;
  }
};

type Rejection = null | false;

/**
 * Decorator adds an aliased property to the class.
 *
 * @param aliasForKey A key of the class to be aliased.
 * @param descriptor Property descriptor.
 */
export const alias = <T, K extends keyof T, P extends keyof T>(
  aliasForKey: K,
  { get, set, ...descriptor }: {
    get?: Rejection | ((this: Omit<T, K>) => T[K]);
    set?: Rejection | ((this: Omit<T, K>, value: T[K]) => void);
  } & Omit<PropertyDescriptor, "get" | "set"> = {},
) =>
(constructor: T, propertyKey: P): void => {
  const defaultGet = function (this: any) {
    return this[propertyKey];
  };

  const defaultSet = function (this: any, value: T[K]) {
    this[propertyKey] = value;
  };

  const allowAccessors = !("value" in descriptor || "writable" in descriptor);

  const resolveSet = resolve(set, defaultSet);
  const resolveGet = resolve(get, defaultGet);

  Object.defineProperty(constructor, aliasForKey, {
    ...(
      allowAccessors && resolveGet
        ? { get: resolveGet }
        : {}
    ),
    ...(
      allowAccessors && resolveSet
        ? { set: resolveSet }
        : {}
    ),
    ...descriptor,
  });
};

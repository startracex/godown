import { createDecorator, type ExperimentalDecorator, type StandardDecorator } from "sharekit";

const resolve = (value, defaults) => {
  if (value) {
    return value;
  }
  if (value === undefined) {
    return defaults;
  }
};

const makeDefaultSetter = (key: PropertyKey) =>
  function (this: any, value) {
    this[key] = value;
  };

const makeDefaultGetter = (key: PropertyKey) =>
  function (this: any) {
    return this[key];
  };

const getAliasDescriptor = (key: PropertyKey, descriptor: PropertyDescriptor) => {
  const { get, set } = descriptor;
  const attribute = {
    ...descriptor,
  };
  const defaultGet = makeDefaultGetter(key);
  const defaultSet = makeDefaultSetter(key);

  const resolveSet = resolve(set, defaultSet);
  const resolveGet = resolve(get, defaultGet);
  if (resolveSet) {
    attribute.set = resolveSet;
  }
  if (resolveGet) {
    attribute.get = resolveGet;
  }
  return attribute;
};

type AliasDecorator<T, K extends keyof T> = {
  get?: null | false | ((this: T) => T[K]);
  set?: null | false | ((this: T, value: T[K]) => void);
} & Omit<PropertyDescriptor, "get" | "set">;

/**
 * Decorator adds an aliased property to the class.
 *
 * @param aliasForKey A key of the class to be aliased.
 * @param descriptor Property descriptor.
 * @returns Decorator.
 */
export const alias = <T, K extends keyof T = any>(
  aliasForKey: K,
  descriptor: AliasDecorator<T, K> = {},
): ExperimentalDecorator<T> & StandardDecorator<T> =>
  createDecorator<-1, T>((proto, propertyKey) => {
    Object.defineProperty(proto, aliasForKey, getAliasDescriptor(propertyKey, descriptor as PropertyDescriptor));
  }, () => getAliasDescriptor(aliasForKey, descriptor as PropertyDescriptor));

export default alias;

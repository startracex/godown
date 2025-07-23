import { isObject } from "sharekit";

type ExperimentalDecorator<T> = (target?: T, name?: PropertyKey, descriptor?: PropertyDescriptor) => void | any;

type StandardDecorator<T> = (
  target?: T | ClassAccessorDecoratorTarget<T, any> | undefined,
  context?: DecoratorContext,
) => void | ClassAccessorDecoratorResult<T, any> | any;

const createDecorator = <
  T = any,
  E extends ExperimentalDecorator<any> = ExperimentalDecorator<T>,
  S extends StandardDecorator<any> = StandardDecorator<T>,
>(
  experimental: E,
  standard: S,
): E & S => {
  return ((target: any, keyOrContext: PropertyKey | DecoratorContext, descriptor?: PropertyDescriptor) => {
    if (!isObject(keyOrContext)) {
      return experimental(target, keyOrContext, descriptor);
    }
    return standard(target, keyOrContext);
  }) as any;
};

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
  createDecorator<T>(
    (proto, propertyKey) => {
      Object.defineProperty(proto, aliasForKey, getAliasDescriptor(propertyKey, descriptor as PropertyDescriptor));
    },
    () => getAliasDescriptor(aliasForKey, descriptor as PropertyDescriptor),
  );

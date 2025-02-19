import type { Constructor } from "./types.js";

export const isNullable = (value: unknown): value is null | undefined => value === null || value === undefined;

export const isNumerical = (value: string | number): boolean => !isNaN(+value);

export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const isString = (value: unknown): value is string => typeof value === "string";

export const isSymbol = (value: unknown): value is symbol => typeof value === "symbol";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isBigInt = (value: unknown): value is bigint => typeof value === "bigint";

export const isFunction = (value: unknown): value is (...args: any[]) => any => typeof value === "function";

export const isObject = (value: unknown): value is object => value !== null && typeof value === "object";

export const isPlainObject = (value: unknown): value is Record<PropertyKey, unknown> =>
  isObject(value) && Object.getPrototypeOf(value) === Object.prototype;

export const isPropertyKey = (value: unknown): value is PropertyKey =>
  isString(value) || isSymbol(value) || isNumber(value);

export const isPrimitive = (value: unknown): value is null | undefined | boolean | string | symbol | number | bigint =>
  !isObject(value) && !isFunction(value);

export const { isArray } = Array as { isArray: <T = any>(value: unknown) => value is T[] };

export const isArrayLike = <T = any>(value: unknown): value is ArrayLike<T> =>
  isArray(value) || (isObject(value) && isNumber((value as any).length));

export const isTemplateStringArray = (value: unknown): value is TemplateStringsArray =>
  isArray(value) && isArray((value as any).raw);

export const isConstructor = <T = any>(value: any): value is Constructor<T> =>
  typeof value === "function" && value.prototype?.constructor === value;

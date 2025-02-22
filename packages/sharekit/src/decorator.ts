import { isObject } from "./is.js";

export type StageExperimental = 1;

export type StageStandard = 3;

export type ExperimentalDecorator<T> = (target?: T, name?: PropertyKey, descriptor?: PropertyDescriptor) => void | any;

export type StandardDecorator<T> = (
  target?: T | ClassAccessorDecoratorTarget<T, any> | undefined,
  context?: DecoratorContext,
) => void | ClassAccessorDecoratorResult<T, any> | any;

export const createDecorator = <
  G extends number = -1,
  T = any,
  E extends ExperimentalDecorator<any> = ExperimentalDecorator<T>,
  S extends StandardDecorator<any> = StandardDecorator<T>,
>(
  experimental: E,
  standard: S,
): G extends StageStandard ? S : G extends StageExperimental ? E : E & S => {
  return ((target: any, keyOrContext: PropertyKey | DecoratorContext, descriptor?: PropertyDescriptor) => {
    if (!isObject(keyOrContext)) {
      return experimental(target, keyOrContext, descriptor);
    }
    return standard(target, keyOrContext);
  }) as any;
};

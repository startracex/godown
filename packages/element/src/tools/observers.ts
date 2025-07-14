import type { Constructor } from "sharekit";

interface SomeObservers {
  target: Node | Element;
  observer: MutationObserver | IntersectionObserver | ResizeObserver | PerformanceObserver;
  callback: MutationCallback | IntersectionObserverCallback | ResizeObserverCallback | PerformanceObserverCallback;
  options: MutationObserverInit | IntersectionObserverInit | ResizeObserverOptions | PerformanceObserverInit;
}

export const normalizeObserver = <
  O = SomeObservers["observer"],
  C = SomeObservers["callback"],
  I = SomeObservers["options"],
  E = SomeObservers["target"],
  F = (target?: E) => void,
  R = [O, F] | [undefined, undefined],
>(
  type: Constructor<O>,
  callback: C,
  options?: I,
): R => {
  let observer: O | undefined;
  let observeFunc: F | undefined;
  switch (type) {
    case MutationObserver:
    case ResizeObserver:
      observer = new type(callback);
      observeFunc =
        ((target: Node & Element) => (observer as MutationObserver | ResizeObserver).observe(target, options)) as F;
      break;
    case IntersectionObserver:
      observer = new type(callback, options);
      observeFunc = ((target: Element) => (observer as IntersectionObserver).observe(target)) as F;
      break;
    case PerformanceObserver as Constructor<PerformanceObserver>:
      observer = new type(callback);
      observeFunc = (() => (observer as PerformanceObserver).observe(options)) as F;
      break;
  }
  return [observer, observeFunc] as R;
};

export class Observers {
  private inner = new Map<SomeObservers["observer"], Set<SomeObservers["target"]>>();

  add(
    target: Node,
    type: Constructor<MutationObserver>,
    callback: MutationCallback,
    options?: MutationObserverInit,
  ): MutationObserver;
  add(
    target: Element,
    type: Constructor<IntersectionObserver>,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ): IntersectionObserver;
  add(
    target: Node,
    type: Constructor<ResizeObserver>,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions,
  ): ResizeObserver;
  add(
    target: Element,
    type: Constructor<PerformanceObserver>,
    callback: PerformanceObserverCallback,
    options?: PerformanceObserverInit,
  ): PerformanceObserver;
  add<O extends SomeObservers["observer"], C extends SomeObservers["callback"], I extends SomeObservers["options"]>(
    target: SomeObservers["target"],
    type: Constructor<O>,
    callback: C,
    options?: I,
  ): O {
    const [observer, observeFunc] = normalizeObserver<O, C, I>(type, callback, options);
    if (!observer) {
      return;
    }
    this.inner.set(observer, (this.inner.get(observer) || new Set<SomeObservers["target"]>()).add(target));
    observeFunc(target);
    return observer;
  }

  remove(
    ob: MutationObserver | IntersectionObserver | ResizeObserver | PerformanceObserver,
    target?: Element,
  ): undefined {
    ob.disconnect();
    const set = this.inner.get(ob);
    if ("unobserve" in ob) {
      if (target) {
        ob.unobserve(target);
        set?.delete(target);
      } else {
        set?.forEach((target) => {
          ob.unobserve(target as Element);
        });
        set?.clear();
      }
      if (set && !set.size) {
        this.inner.delete(ob);
      }
    } else if (set) {
      this.inner.delete(ob);
    }
  }

  removeAll(): void {
    this.inner.forEach((_, ob) => {
      this.remove(ob);
    });
  }
}

export default Observers;

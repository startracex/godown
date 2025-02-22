type EventMap = WindowEventMap & DocumentEventMap;
type EventNames = keyof EventMap;
type EventAddOptions = boolean | AddEventListenerOptions;

export type EventListenerFunc<T = HTMLElement, E = Event> =
  | EventListenerOrEventListenerObject
  | ((e: HandlerEvent<T, E>, ...args: any[]) => any);

export type HandlerEvent<T = HTMLElement, E = Event> = E & {
  target: T;
} & Record<string, any>;

export class Events {
  private inner = new Map<string, Map<EventTarget, Set<EventListenerFunc>>>();

  add<
    T extends EventTarget = HTMLElement,
    F extends EventListenerFunc<T> = EventListenerFunc<T>,
    N extends string = EventNames,
  >(src: T, type: N, listener: F, options?: EventAddOptions): F {
    if (!src || !listener) {
      return;
    }

    const typeMap = this.inner.get(type) || new Map<EventTarget, Set<EventListenerFunc>>();
    const elementSet = typeMap.get(src) || new Set<EventListenerFunc>();

    elementSet.add(listener);
    typeMap.set(src, elementSet);
    this.inner.set(type, typeMap);

    src.addEventListener(type, listener, options);
    return listener;
  }

  remove<E extends EventTarget = HTMLElement>(
    src: E,
    type: EventNames,
    listener: EventListenerFunc,
    option?: EventListenerOptions,
  ): undefined {
    if (!src || !listener) {
      return;
    }

    const typeMap = this.inner.get(type);
    if (typeMap) {
      const elementSet = typeMap.get(src);
      if (elementSet) {
        elementSet.delete(listener);
        if (!elementSet.size) {
          typeMap.delete(src);
          if (!typeMap.size) {
            this.inner.delete(type);
          }
        }
      }
    }

    src.removeEventListener(type, listener, option);
  }

  removeAll(): undefined {
    this.inner.forEach((typeMap, type) => {
      typeMap.forEach((eventListeners, src) => {
        eventListeners.forEach((listener) => {
          src.removeEventListener(type, listener);
        });
      });
      typeMap.clear();
    });
    this.inner.clear();
  }
}

export default Events;

export type EventMap = WindowEventMap & DocumentEventMap;
export type EventNames = keyof EventMap;
export type EventHandler = GlobalEventHandlersEventMap[keyof GlobalEventHandlersEventMap];
export type EventListenerFunc<T = HTMLElement, E = Event> =
  | EventListenerOrEventListenerObject
  | ((e: HandlerEvent<T, E>, ...args: any[]) => any);
export type EventAddOptions = boolean | AddEventListenerOptions;

export type HandlerEvent<T = HTMLElement, E = Event> = E & {
  target: T;
} & Record<string, any>;

export class Events {
  private m = new Map<EventNames, Map<EventTarget, Set<EventListenerFunc>>>();

  add<
    T extends EventTarget = HTMLElement,
    F extends EventListenerFunc<T> = EventListenerFunc<T>,
  >(
    src: T,
    type: EventNames,
    listener: F,
    options?: EventAddOptions,
  ): F {
    const eType = this.m.get(type) || new Map<any, Set<EventListenerFunc>>();
    const eElem = eType.get(src) || new Set<EventListenerFunc>();

    eElem.add(listener);
    eType.set(src, eElem);
    this.m.set(type, eType);

    src.addEventListener(type, listener, options);
    return listener;
  }

  remove<E extends EventTarget = HTMLElement>(
    src: E,
    type: EventNames,
    listener: EventListenerFunc,
    option?: EventListenerOptions,
  ): undefined {
    if (listener) {
      const eType = this.m.get(type);
      if (eType) {
        const eElem = eType.get(src);
        if (eElem) {
          eElem.delete(listener);
          if (!eElem.size) {
            eType.delete(src);
            if (!eType.size) {
              this.m.delete(type);
            }
          }
        }
      }
      src.removeEventListener(type, listener, option);
    }
  }

  removeAll(): undefined {
    this.m.forEach((typeMap, type) => {
      typeMap.forEach((eventListeners, src) => {
        eventListeners.forEach((listener) => {
          src.removeEventListener(type, listener);
        });
      });
      typeMap.clear();
      this.m.delete(type);
    });
  }
}

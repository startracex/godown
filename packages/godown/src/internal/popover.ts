import { memoize } from "./utils.js";

const POPOVER = "popover";

const supportPopover = memoize(() => Object.hasOwn(HTMLElement.prototype, POPOVER));

const getPopoverAttribute = (element: HTMLElement) => element.getAttribute(POPOVER);

const shimHide = (element: HTMLElement) => {
  element.style.display = "none";
};

const standardHide = (element: HTMLElement) => {
  if (getPopoverAttribute(element) !== null) {
    element.hidePopover();
  } else {
    shimHide(element);
  }
};

export const hidePopover: (this: void | HTMLElement, element: HTMLElement) => void = function (this, element) {
  const hideFn = supportPopover() ? standardHide : shimHide;
  hideFn.call(this, element);
};

const shimShow = (element: HTMLElement) => {
  element.style.display = "block";

  if (getPopoverAttribute(element) !== "manual") {
    const listenType = "click";
    const listener = (e: MouseEvent) => {
      if (!element.contains(e.target as Node)) {
        element.dispatchEvent(
          new Event("toggle", {
            bubbles: true,
            composed: true,
            newState: "closed",
          } as ToggleEvent),
        );
        hidePopover(element);
        document.removeEventListener(listenType, listener);
      }
    };

    document.addEventListener(listenType, listener);
  }
};

const standardShow = (element: HTMLElement) => {
  if (getPopoverAttribute(element) !== null) {
    element.showPopover();
  } else {
    shimShow(element);
  }
};

export const showPopover: (this: void | HTMLElement, element: HTMLElement) => void = function (this, element) {
  const showFn = supportPopover() ? standardShow : shimShow;
  showFn.call(this, element);
};

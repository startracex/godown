import { memoize } from "./utils.js";

const POPOVER = "popover";

const supportPopover = () => Object.hasOwn(HTMLElement.prototype, POPOVER);

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

export const hidePopover: (element: HTMLElement) => void = memoize((element: HTMLElement) => {
  if (supportPopover()) {
    return standardHide(element);
  }
  return shimHide(element);
});

function shimShow(this: void | HTMLElement, element: HTMLElement) {
  element.style.display = "block";

  if (this && getPopoverAttribute(element) !== "manual") {
    const listenType = "click";
    const listener = (e: MouseEvent) => {
      if (!this.contains(e.target as Node)) {
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
}

function standardShow(this: void | HTMLElement, element: HTMLElement) {
  if (getPopoverAttribute(element) !== null) {
    element.showPopover();
  } else {
    shimShow.call(this, element);
  }
}

export const showPopover: (this: void | HTMLElement, element: HTMLElement) => void = memoize(function (this, element) {
  if (supportPopover()) {
    return standardShow.call(this, element);
  }
  return shimShow.call(this, element);
});

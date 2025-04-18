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

export let hidePopover = (element: HTMLElement): void => {
  hidePopover = supportPopover() ? standardHide : shimHide;
  hidePopover(element);
};

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

export let showPopover = function <This extends void | HTMLElement>(this: This, element: HTMLElement): void {
  if (supportPopover()) {
    showPopover = standardShow;
  } else {
    showPopover = shimShow;
  }

  showPopover.call(this, element);
};

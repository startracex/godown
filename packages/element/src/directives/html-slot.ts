import { html, nothing, type TemplateResult } from "lit";

import type { EventListenerFunc } from "../tools/events.js";

/**
 * Slot element directive.
 *
 * @param name Slot name, if undefined, no name attribute will be added.
 * @param slotChange Slot change event listener.
 * @returns TemplateResult or nothing.
 */
export const htmlSlot = (name?: string, slotChange?: EventListenerFunc): TemplateResult<1> =>
  html`<slot name="${name || nothing}" @slotchange=${slotChange || null}></slot>`;

export default htmlSlot;

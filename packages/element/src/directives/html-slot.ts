import { html, nothing, type TemplateResult } from "lit";

/**
 * Slot element directive.
 *
 * @param name Slot name, if zero value, no name attribute will be added.
 * @returns TemplateResult or nothing.
 */
export const htmlSlot = (name?: string): TemplateResult<1> => html`<slot name="${name || nothing}"></slot>`;

export default htmlSlot;

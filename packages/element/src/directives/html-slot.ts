import { html, nothing, type TemplateResult } from "lit";

/**
 * Slot element directive.
 *
 * @param name Slot name, if undefined, no name attribute will be added.
 */
export const htmlSlot = (name?: string): TemplateResult<1> => html`<slot name="${name || nothing}"></slot>`;

export default htmlSlot;

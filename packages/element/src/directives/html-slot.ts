import { html, type TemplateResult } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * Slot element directive.
 *
 * @param name Slot name, if undefined, no name attribute will be added.
 */
export const htmlSlot = (name?: string): TemplateResult<1> => html`<slot name="${ifDefined(name)}"></slot>`;

export default htmlSlot;

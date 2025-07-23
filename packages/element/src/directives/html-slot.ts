import { html, nothing, type TemplateResult } from "lit";

const h = html;

/**
 * Slot element directive.
 *
 * @param name Slot name, if zero value, no name attribute will be added.
 * @param placeholder Placeholder, if zero value, no placeholder will be added.
 * @returns TemplateResult or nothing.
 */
export const htmlSlot = (name?: string, placeholder?: any): TemplateResult<1> =>
  h`<slot name="${name || nothing}">${placeholder || nothing}</slot>`;

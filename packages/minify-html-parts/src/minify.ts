import extractSourceFile, { type TaggedTemplateExpressionResult, type TemplateExpressionResult } from "template-extractor";
import { getTextRange } from "template-extractor/utils.js";
import { buildString } from "./build-string.js";

export interface MinifyOptions {
  removeComments?: boolean;
  removeAttributeQuotes?: boolean;
  removeEmptyAttributeValues?: boolean;
  shouldMinify?: (extractResult: TaggedTemplateExpressionResult | TemplateExpressionResult) => boolean;
}

/**
 * Determines whether the given template expression is an html expression.
 *
 * @param result - The tagged template expression or template expression to check.
 * @returns `true` if the HTML expression is inside a ExtractResult, `false` otherwise.
 */
export const isHtmlExpression = (result: TaggedTemplateExpressionResult | TemplateExpressionResult) => {
  if (result.type === "TaggedTemplateExpression") {
    const tag = result.tag.getText();
    // html`` or htm``
    if (tag === "html" || tag === "htm") {
      return true;
    }
  }
  if (result.type === "TemplateExpression") {
    const full = result.node.getFullText();
    const start = result.node.getFullStart();
    const end = result.node.getStart();
    if (start === end) {
      return false;
    }
    const before = full.slice(0, end - start);
    // /* html */ or /* htm */
    return /^\s*\/\*\s*(html|htm)\s*\*\/\s*$/i.test(before);
  }
  return false;
};

const trim = (a: string[]) => {
  if (!a.length) {
    return;
  }
  a[0] = a[0].trimStart();
  const last = a.length - 1;
  a[last] = a[last].trimEnd();
};

/**
 * Determines whether the given HTML string is inside an HTML tag.
 *
 * @param part - The HTML string to check.
 * @param currentState - The current state of whether the string is inside a tag.
 * @returns `true` if the HTML string is inside a tag, `false` otherwise.
 */
export const isInsideTag = (part: string, currentState: boolean) => {
  const l = part.indexOf("<");
  const r = part.lastIndexOf(">");
  if (l === -1 && r === -1) {
    return currentState;
  }
  if (l === -1) {
    return false;
  }
  if (r === -1) {
    return true;
  }
  return l < r;
};

export const minifyPart = (input: string, options: MinifyOptions): string => {
  input = input
    .replace(/\s+/g, " ")
    .replace(/\s*\/?>/, ">")
    .replace(/>\s*</g, "><");
  if (options.removeAttributeQuotes) {
    input = input.replace(/(\w+)=\"([^"]+)\"/g, "$1=$2");
  }
  if (options.removeEmptyAttributeValues) {
    input = input.replace(/(\w+)=(""|'')/g, "");
  }
  if (options.removeComments) {
    input = input.replace(/<!--.*?-->/g, "");
  }
  return input;
};

export const minifyPartsArray = (parts: string[], options: MinifyOptions): string[] => {
  parts = parts.map((part) => minifyPart(part, options));
  trim(parts);

  if (!options.removeAttributeQuotes) {
    return parts;
  }

  let isInside = false;
  for (let i = 0; i < parts.length; i++) {
    const currentPart = parts[i];
    parts[i] = currentPart;
    isInside = isInsideTag(currentPart, isInside);

    if (isInside && i + 1 < parts.length) {
      const nextPart = parts[i + 1];
      if (
        (currentPart.endsWith("\"") && nextPart.startsWith("\"")) ||
        (currentPart.endsWith("'") && nextPart.startsWith("'"))
      ) {
        parts[i] = currentPart.slice(0, -1);
        parts[i + 1] = parts[i + 1].slice(1);
      }
    }
  }

  return parts;
};

/**
 * Joins an array of string parts with their corresponding values.
 *
 * @param strings - An array of string parts.
 * @param values - An array of values to be interpolated into the string parts.
 * @returns The joined string with the values interpolated.
 */
export const joinParts = (strings: string[], values: string[]) =>
  strings.reduce(
    (acc, current, i) => acc + current + (i < values.length ? `\${${values[i]}}` : ""),
    "",
  );

const defaultOptions: MinifyOptions = {
  removeComments: true,
  removeAttributeQuotes: false,
  removeEmptyAttributeValues: false,
  shouldMinify: isHtmlExpression,
};

/**
 * Minifies the TypeScript string containing HTML expression based on the provided options.
 *
 * @param input - The input HTML string to be minified.
 * @param options - An optional object containing options for the minification process.
 * @param options.shouldMinify - A function that determines whether a specific HTML element should be minified.
 * @param options.removeComments - A boolean indicating whether HTML comments should be removed.
 * @param options.removeAttributeQuotes - A boolean indicating whether attribute quotes should be removed.
 * @returns The minified TypeScript string.
 */
export const minify = (
  input: string,
  options: MinifyOptions = {},
) => {
  options = { ...defaultOptions, ...options };
  let finalString = "";
  let lastEnd = 0;
  const extracted = extractSourceFile(input);
  extracted.forEach((result: TaggedTemplateExpressionResult | TemplateExpressionResult) => {
    const { start, end } = getTextRange(result.node);
    if (options.shouldMinify(result)) {
      finalString += input.slice(lastEnd, start);
      finalString += buildString(result, (strings, values) => {
        const parts = minifyPartsArray(strings, options);
        return joinParts(parts, values);
      });
    } else {
      finalString += input.slice(lastEnd, end);
    }
    lastEnd = end;
  });
  finalString += input.slice(lastEnd);
  return finalString;
};

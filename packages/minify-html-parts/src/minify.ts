import extractSourceFile, { type TaggedTemplateExpressionResult, type TemplateExpressionResult } from "template-extractor";
import { getTextRange } from "template-extractor/utils.js";
import { buildString } from "./build-string.js";
import { parsePart } from "./parse-parts.js";

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

const trimBothSide = (a: string[]) => {
  if (!a.length) {
    return;
  }
  a[0] = a[0].trimStart();
  const last = a.length - 1;
  a[last] = a[last].trimEnd();
};

const minifyAnyPart = (input: string, options: MinifyOptions): string => {
  if (options.removeComments) {
    input = input.replace(/<!--.*?-->/g, "");
  }
  input = input.replace(/\s+/g, " ");
  return input;
};

const minifyInTagPart = (input: string, options: MinifyOptions) => {
  if (options.removeEmptyAttributeValues) {
    input = input.replace(/(\w+)=(""|'')/g, "$1");
  }
  if (options.removeAttributeQuotes) {
    input = input.replace(/(\w+)=\"([^"]+)\"/g, "$1=$2");
  }
  if (options.removeEmptyAttributeValues) {
    input = input.replace(/(\w+)=(""|'')/g, "");
  }
  input = input.replace(/\s+(?=[>\/>])/g, "");
  return input;
};

const minifyPartsArray = (parts: string[], options: MinifyOptions): string[] => {
  parts = parts.map((part) => minifyAnyPart(part, options));
  trimBothSide(parts);
  const context = {
    inTag: false,
  };
  let prevEndsWithEqualQuote = false;
  for (let i = 0; i < parts.length; i++) {
    const parsedPart = parsePart(parts[i], context);
    parts[i] = parsedPart
      .map(({
        inTag,
        text,
      }) => {
        if (!inTag) {
          return text;
        }
        text = minifyInTagPart(text, options);
        if (options.removeAttributeQuotes) {
          if (prevEndsWithEqualQuote && text.startsWith("\"")) {
            text = text.slice(1);
          }
          prevEndsWithEqualQuote = text.endsWith("=\"");
          if (prevEndsWithEqualQuote) {
            text = text.slice(0, -1);
          }
        }
        return text;
      })
      .join("");
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
  strings.reduce((acc, current, i) => acc + current + (i < values.length ? `\${${values[i]}}` : ""), "");

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
export const minify = (input: string, options: MinifyOptions = {}) => {
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

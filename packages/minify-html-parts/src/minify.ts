import extractSourceFile, { type TaggedTemplateExpressionResult, type TemplateExpressionResult } from "template-extractor";
import { getTextRange } from "template-extractor/utils.js";
import { buildString } from "./build-string.js";

export interface MinifyOptions {
  removeComments?: boolean;
  removeAttributeQuotes?: boolean;
  shouldMinify?: (_: TaggedTemplateExpressionResult | TemplateExpressionResult) => boolean;
}

export const isHtmlExpression = (result: TaggedTemplateExpressionResult | TemplateExpressionResult) => {
  if (result.type === "TaggedTemplateExpression") {
    const tag = result.tag.getText();
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

export const isInsideTag = (h: string, isInside: boolean) => {
  const l = h.indexOf("<");
  const r = h.lastIndexOf(">");
  if (l === -1 && r === -1) {
    return isInside;
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

export const joinParts = (strings: string[], values: string[]) =>
  strings.reduce(
    (acc, current, i) => acc + current + (i < values.length ? `\${${values[i]}}` : ""),
    "",
  );

const defaultOptions = {
  removeComments: true,
  removeAttributeQuotes: false,
  shouldMinify: isHtmlExpression,
};

export const minify = (
  input: string,
  options: {
    shouldMinify?: (_: TaggedTemplateExpressionResult | TemplateExpressionResult) => boolean;
    removeComments?: boolean;
    removeAttributeQuotes?: boolean;
  } = {},
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

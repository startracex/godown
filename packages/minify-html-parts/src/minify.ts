import extractSourceFile, {
  type TaggedTemplateExpressionResult,
  type TemplateExpressionResult,
} from "template-extractor";
import { getTemplateTextRange, type TemplateParts } from "template-extractor/utils.js";
import { parsePart } from "./parse-part.js";
import MagicString from "magic-string";

export interface MinifyOptions {
  removeComments?: boolean;
  removeAttributeQuotes?: boolean;
  removeEmptyAttributeValues?: boolean;
  shouldMinify?: (extractResult: TaggedTemplateExpressionResult | TemplateExpressionResult) => boolean;
}

const htmlTagRegexp = /^\s*\/\*\s*(html|htm)\s*\*\/\s*$/i;

/**
 * Determines whether the given template expression is an html expression.
 *
 * @param result - The tagged template expression or template expression to check.
 * @returns `true` if the HTML expression is inside a ExtractResult, `false` otherwise.
 */
export const isHtmlExpression = (result: TaggedTemplateExpressionResult | TemplateExpressionResult) => {
  if ("tag" in result) {
    const tag = result.tag.getText().toLowerCase();
    // html`` or htm``
    return tag === "html" || tag === "htm";
  }
  const start = result.node.getFullStart();
  const end = result.node.getStart();
  if (start === end) {
    return false;
  }
  const full = result.node.getFullText();
  const before = full.slice(0, end - start);
  // /* html */`` or /* htm */``
  return htmlTagRegexp.test(before);
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
    input = input.replace(/(\w+)=\"([^"\s]+)\"/g, "$1=$2");
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
      .map(({ inTag, text }) => {
        if (!inTag) {
          return text;
        }
        text = minifyInTagPart(text, options);
        if (options.removeAttributeQuotes) {
          if (prevEndsWithEqualQuote && text.startsWith('"')) {
            text = text.slice(1);
          }
          prevEndsWithEqualQuote = text.endsWith('="');
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

const joinMagicString = (ms: MagicString, rawStrings: TemplateParts["strings"], strings: string[]) => {
  for (let i = 0; i < rawStrings.length; i++) {
    const rawString = rawStrings[i];
    const string = strings[i];
    const { start, end } = getTemplateTextRange(rawString);
    if (start === end) {
      continue;
    }
    ms.overwrite(start, end, string);
  }
};

const defaultOptions: MinifyOptions = {
  removeComments: true,
  removeAttributeQuotes: false,
  removeEmptyAttributeValues: false,
  shouldMinify: isHtmlExpression,
};

const buildString = (
  templateExpressionResult: TaggedTemplateExpressionResult | TemplateExpressionResult,
  processParts: (strings: TemplateParts["strings"]) => void,
) => {
  const { strings, values } = templateExpressionResult;
  for (let stringsIndex = 0; stringsIndex < strings.length; stringsIndex++) {
    if (stringsIndex < values.length) {
      const span = templateExpressionResult.children[stringsIndex];
      const { children: spans } = span;
      for (const expr of spans) {
        buildString(expr, processParts);
      }
    }
  }
  processParts(strings);
};

/**
 * Minifies the TypeScript string containing HTML expression based on the provided options.
 *
 * @param input - The input HTML string to be minified.
 * @param options - An optional object containing options for the minification process.
 * @param options.shouldMinify - A function that determines whether a specific HTML element should be minified.
 * @param options.removeComments - A boolean indicating whether HTML comments should be removed.
 * @param options.removeAttributeQuotes - A boolean indicating whether attribute quotes should be removed.
 * @returns The minified TypeScript code and map.
 */
export const minify = (input: string, options: MinifyOptions = {}) => {
  options = { ...defaultOptions, ...options };
  const ms = new MagicString(input);
  const extracted = extractSourceFile(input);
  extracted.forEach((result) => {
    if (options.shouldMinify(result)) {
      buildString(result, (strings) => {
        const parts = minifyPartsArray(
          strings.map((s) => s.text),
          options,
        );
        joinMagicString(ms, strings, parts);
      });
    }
  });
  return {
    code: ms.toString(),
    map: ms.generateMap({ hires: true }),
  };
};

import type { TaggedTemplateExpressionResult, TemplateExpressionResult } from "template-extractor";

/**
 * Builds a string by combining a template expression result with a custom build function.
 *
 * @param templateExpressionResult - The template expression result to build the string from.
 * @param buildFunc - A function to build the string from the template expression result.
 * @returns The built string.
 */
export const buildString = (
  templateExpressionResult: TaggedTemplateExpressionResult | TemplateExpressionResult,
  buildFunc: (strings: string[], values: string[]) => string,
): string => {
  const src = templateExpressionResult.node.getSourceFile().text;
  const head = src.slice(templateExpressionResult.start, templateExpressionResult.template.getStart() + 1);
  const tail = src.slice(templateExpressionResult.template.getEnd() - 1, templateExpressionResult.end);
  const { strings, values } = templateExpressionResult;
  const resultStrings = [];
  const resultValues = [];
  for (let stringsIndex = 0; stringsIndex < strings.length; stringsIndex++) {
    resultStrings.push(strings[stringsIndex]);
    if (stringsIndex < values.length) {
      let newValue = "";
      const span = templateExpressionResult.children[stringsIndex];
      const { children: spans } = span;
      if (spans.length === 0) {
        newValue += span.text;
      } else {
        let lastEnd = span.start;
        for (const expr of spans) {
          newValue += src.slice(lastEnd, expr.start);
          lastEnd = expr.end;
          newValue += buildString(expr, buildFunc);
        }
        newValue += src.slice(lastEnd, span.end);
      }
      newValue += "";
      resultValues.push(newValue);
    }
  }
  return head + (buildFunc(resultStrings, resultValues)) + tail;
};

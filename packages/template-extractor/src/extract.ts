import ts from "typescript";
import { type ExtractResult, TaggedTemplateExpressionResult, TemplateExpressionResult, TemplateSpanResult } from "./classes.js";

export function extractSourceFile(input: string): (TaggedTemplateExpressionResult | TemplateExpressionResult)[] {
  const sourceFile = ts.createSourceFile("", input, ts.ScriptTarget.Latest, true);
  return extract(sourceFile) as (TaggedTemplateExpressionResult | TemplateExpressionResult)[];
}

export function extract(node: ts.Node, parent?: ts.Node): ExtractResult[] {
  const result: ExtractResult[] = [];

  // If parent is TaggedTemplateExpression
  const inTagged = parent && ts.isTaggedTemplateExpression(parent);

  if (ts.isTaggedTemplateExpression(node)) {
    const item = new TaggedTemplateExpressionResult(node);
    ts.forEachChild(node, (n) => {
      item.children.push(...extract(n, node) as TemplateSpanResult[]);
    });
    result.push(item);
    return result;
  }

  if (
    ts.isTemplateExpression(node) &&
    // Ensure duplicate tagged are not collected
    !inTagged
  ) {
    const item = new TemplateExpressionResult(node);
    for (const span of node.templateSpans) {
      item.children.push(...extract(span) as TemplateSpanResult[]);
    }
    result.push(item);
    return result;
  }

  if (ts.isTemplateSpan(node)) {
    const item = new TemplateSpanResult(node);
    item.children = extract(node.expression) as (TaggedTemplateExpressionResult | TemplateExpressionResult)[];
    result.push(item);
    return result;
  }

  ts.forEachChild(node, (n) => {
    result.push(...extract(n));
  });

  return result;
}

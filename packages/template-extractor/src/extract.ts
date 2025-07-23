import {
  createSourceFile,
  forEachChild,
  isTaggedTemplateExpression,
  isTemplateExpression,
  isTemplateSpan,
  type Node,
  ScriptTarget,
} from "typescript";
import {
  type ExtractResult,
  TaggedTemplateExpressionResult,
  TemplateExpressionResult,
  TemplateSpanResult,
} from "./classes.js";

export function extractSourceFile(input: string): (TaggedTemplateExpressionResult | TemplateExpressionResult)[] {
  const sourceFile = createSourceFile("", input, ScriptTarget.Latest, true);
  return extract(sourceFile) as (TaggedTemplateExpressionResult | TemplateExpressionResult)[];
}

export function extract(node: Node, parent?: Node): ExtractResult[] {
  const result: ExtractResult[] = [];

  // If parent is TaggedTemplateExpression
  const inTagged = parent && isTaggedTemplateExpression(parent);

  if (isTaggedTemplateExpression(node)) {
    const item = new TaggedTemplateExpressionResult(node);
    forEachChild(node, (n) => {
      item.children.push(...(extract(n, node) as TemplateSpanResult[]));
    });
    result.push(item);
    return result;
  }

  if (
    isTemplateExpression(node) &&
    // Ensure duplicate tagged are not collected
    !inTagged
  ) {
    const item = new TemplateExpressionResult(node);
    for (const span of node.templateSpans) {
      item.children.push(...(extract(span) as TemplateSpanResult[]));
    }
    result.push(item);
    return result;
  }

  if (isTemplateSpan(node)) {
    const item = new TemplateSpanResult(node);
    item.children = extract(node.expression) as (TaggedTemplateExpressionResult | TemplateExpressionResult)[];
    result.push(item);
    return result;
  }

  forEachChild(node, (n) => {
    result.push(...extract(n));
  });

  return result;
}

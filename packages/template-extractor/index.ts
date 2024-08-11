import ts from "typescript";

export interface ExtractResult {
  tag?: string;
  type: "TaggedTemplateExpression" | "TemplateExpression" | "TemplateSpan";
  kind: ts.TemplateExpression["kind"] | ts.TemplateExpression["kind"] | ts.TemplateSpan["kind"];
  text: string;
  start: number;
  end: number;
  children?: ExtractResult[];
}

export function extractSourceFile(src: string) {
  const sourceFile = ts.createSourceFile("", src, ts.ScriptTarget.Latest, true);
  return extract(sourceFile);
}

export default extractSourceFile;

export function extract(node: ts.Node, parent?: ts.Node): ExtractResult[] {
  const result: ExtractResult[] = [];

  // If parent is TaggedTemplateExpression
  const inTagged = parent && ts.isTaggedTemplateExpression(parent);

  if (ts.isTaggedTemplateExpression(node)) {
    const tag = node.tag.getText();
    const template = node.template as ts.TemplateExpression;
    const children: ExtractResult[] = [];
    ts.forEachChild(node, (n) => {
      children.push(...extract(n, node));
    });
    result.push({
      tag: tag,
      type: "TaggedTemplateExpression",
      kind: template.kind,
      text: template.getFullText(),
      start: template.getFullStart(),
      end: template.getEnd(),
    });
    if (children.length > 0) {
      result[result.length - 1].children = children;
    }
    return result;
  }

  if (
    ts.isTemplateExpression(node)
    // Make sure duplicate tagged are not collected
    && !inTagged
  ) {
    const spans = node.templateSpans;
    const children: ExtractResult[] = [];
    if (spans) {
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        children.push(...extract(span));
      }
    }
    const item: ExtractResult = {
      tag: "",
      type: "TemplateExpression",
      kind: node.kind,
      text: node.getFullText(),
      start: node.getFullStart(),
      end: node.getEnd(),
      children,
    };
    result.push(item);
    return result;
  }

  if (ts.isTemplateSpan(node)) {
    const literal = node.literal;
    const expression = node.expression;
    const children = extract(expression);
    const start = expression.getFullStart();
    const end = literal.getStart();
    const text = node.getSourceFile().text.slice(start, end);
    const item: ExtractResult = {
      type: "TemplateSpan",
      kind: node.kind,
      text,
      start,
      end,
    };
    if (children.length) {
      item.children = children;
    }
    result.push(item);
    return result;
  }

  ts.forEachChild(node, (n) => {
    result.push(...extract(n));
  });

  return result;
}

import ts from "typescript";

export type TextRange = {
  start: number;
  end: number;
  text: string;
};

export type TemplateParts = {
  strings: string[];
  values: string[];
};

export function getTemplateParts(node: ts.TemplateLiteral): TemplateParts {
  const strings: string[] = [];
  const values: string[] = [];

  if (ts.isTemplateExpression(node)) {
    strings.push(node.head.text);
    for (const span of node.templateSpans) {
      values.push(span.expression.getText());
      strings.push(span.literal.text);
    }
  } else {
    strings.push(node.text);
  }

  return { strings, values };
}

export function getTextRange(node: ts.Node, full?: boolean): TextRange {
  return {
    start: full ? node.getFullStart() : node.getStart(),
    end: node.getEnd(),
    text: full ? node.getFullText() : node.getText(),
  };
}

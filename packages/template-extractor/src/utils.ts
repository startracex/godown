import type ts from "typescript";

export type TextRange = {
  start: number;
  end: number;
  text: string;
};

export type TemplateParts = {
  strings: string[];
  values: string[];
};

export function getTemplateParts(node: ts.TemplateExpression): TemplateParts {
  const strings: string[] = [];
  const values: string[] = [];

  if (node.head) {
    strings.push(node.head.text);
  }

  if (node.templateSpans) {
    for (const span of node.templateSpans) {
      values.push(span.expression.getText());
      strings.push(span.literal.text);
    }
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

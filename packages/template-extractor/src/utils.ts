import ts, { Expression, TemplateLiteralLikeNode } from "typescript";

export type TextRange = {
  start: number;
  end: number;
  text: string;
};

export type TemplateParts = {
  strings: TemplateLiteralLikeNode[];
  values: Expression[];
};

export function getTemplateParts(node: ts.TemplateLiteral): TemplateParts {
  const strings = [];
  const values = [];

  if (ts.isTemplateExpression(node)) {
    strings.push(node.head);
    for (const span of node.templateSpans) {
      values.push(span.expression);
      strings.push(span.literal);
    }
  } else {
    strings.push(node);
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

export function getTemplateTextRange(node: ts.TemplateLiteralLikeNode): TextRange {
  return {
    start: node.getStart() + 1,
    end: node.getEnd() - (ts.isTemplateTail(node) ? 1 : 2),
    text: node.text,
  };
}

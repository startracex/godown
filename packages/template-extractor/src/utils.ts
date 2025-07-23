import {
  type Expression,
  isTemplateExpression,
  isTemplateTail,
  type Node,
  type TemplateLiteral,
  type TemplateLiteralLikeNode,
} from "typescript";

export type TextRange = {
  start: number;
  end: number;
  text: string;
};

export type TemplateParts = {
  strings: TemplateLiteralLikeNode[];
  values: Expression[];
};

export function getTemplateParts(node: TemplateLiteral): TemplateParts {
  const strings = [];
  const values = [];

  if (isTemplateExpression(node)) {
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

export function getTextRange(node: Node, full?: boolean): TextRange {
  return {
    start: full ? node.getFullStart() : node.getStart(),
    end: node.getEnd(),
    text: full ? node.getFullText() : node.getText(),
  };
}

export function getTemplateTextRange(node: TemplateLiteralLikeNode): TextRange {
  return {
    start: node.getStart() + 1,
    end: node.getEnd() - (isTemplateTail(node) ? 1 : 2),
    text: node.text,
  };
}

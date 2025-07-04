import ts, { Expression, TemplateLiteralLikeNode } from "typescript";
import { getTemplateParts, getTextRange, type TextRange } from "./utils.js";

type TaggedTemplateExpressionNode = {
  type: "TaggedTemplateExpression";
} & ts.TaggedTemplateExpression;

type TemplateExpressionNode = {
  type: "TemplateExpression";
} & ts.TemplateExpression;

type TemplateSpanNode = {
  type: "TemplateSpan";
} & ts.TemplateSpan;

type NodeType = TaggedTemplateExpressionNode | TemplateExpressionNode | TemplateSpanNode;

type ToJSON<
  T extends {
    toJSON: () => any;
  },
> = ReturnType<T["toJSON"]>;

class BaseResult<N extends NodeType = NodeType> {
  type: N["type"];
  kind: N["kind"];
  node: Omit<N, "type">;
  children: ExtractResult[] = [];

  constructor(node: Omit<N, "type">) {
    this.node = node;
    this.kind = node.kind;
    switch (node.kind) {
      case ts.SyntaxKind.TaggedTemplateExpression:
        this.type = "TaggedTemplateExpression";
        break;
      case ts.SyntaxKind.TemplateExpression:
        this.type = "TemplateExpression";
        break;
      case ts.SyntaxKind.TemplateSpan:
        this.type = "TemplateSpan";
        break;
    }
  }

  get text(): string {
    return this.node.getText();
  }

  get start(): number {
    return this.node.getStart();
  }

  get end(): number {
    return this.node.getEnd();
  }

  toJSON(): {
    type: N["type"];
    kind: N["kind"];
  } & TextRange {
    return {
      type: this.type,
      kind: this.kind,
      text: this.text,
      start: this.start,
      end: this.end,
    };
  }
}

export class TaggedTemplateExpressionResult extends BaseResult<TaggedTemplateExpressionNode> {
  tag: ts.LeftHandSideExpression;
  template: ts.TemplateLiteral;
  strings: TemplateLiteralLikeNode[];
  values: Expression[];
  children: TemplateSpanResult[];

  constructor(node: ts.TaggedTemplateExpression) {
    super(node);
    this.tag = node.tag;
    this.template = node.template;
    const { strings, values } = getTemplateParts(this.template);
    this.strings = strings;
    this.values = values;
  }

  toJSON():
    & {
      tag: TextRange;
      template: TextRange;
      type: TaggedTemplateExpressionNode["type"];
      kind: TaggedTemplateExpressionNode["kind"];
      children: ToJSON<TemplateSpanResult>[];
      strings: string[];
      values: string[];
    }
    & TextRange {
    return {
      ...super.toJSON(),
      tag: getTextRange(this.tag),
      template: getTextRange(this.template),
      strings: this.strings.map((string) => string.text),
      values: this.values.map((value) => value.getText()),
      children: this.children.map((child) => child.toJSON()),
    };
  }
}

export class TemplateExpressionResult extends BaseResult<TemplateExpressionNode> {
  template: ts.TemplateLiteral;
  strings: TemplateLiteralLikeNode[];
  values: Expression[];
  children: TemplateSpanResult[];

  constructor(node: ts.TemplateExpression) {
    super(node);
    this.template = node;
    const { strings, values } = getTemplateParts(this.template);
    this.strings = strings;
    this.values = values;
  }

  toJSON():
    & {
      template: TextRange;
      type: TemplateExpressionNode["type"];
      kind: TemplateExpressionNode["kind"];
      children: ToJSON<TemplateSpanResult>[];
      strings: string[];
      values: string[];
    }
    & TextRange {
    return {
      ...super.toJSON(),
      template: getTextRange(this.template),
      strings: this.strings.map((string) => string.text),
      values: this.values.map((value) => value.getText()),
      children: this.children.map((child) => child.toJSON()),
    };
  }
}

export class TemplateSpanResult extends BaseResult<TemplateSpanNode> {
  span: TextRange;
  children: (TaggedTemplateExpressionResult | TemplateExpressionResult)[];

  constructor(node: ts.TemplateSpan) {
    super(node);
    const { literal, expression } = node;
    const spanStart = expression.getFullStart();
    const spanEnd = literal.getStart();
    const spanText = node.getSourceFile().text.slice(spanStart, spanEnd);
    this.span = {
      start: spanStart,
      end: spanEnd,
      text: spanText,
    };
  }

  get text(): string {
    return this.node.expression.getText();
  }

  get start(): number {
    return this.node.expression.getStart();
  }

  get end(): number {
    return this.node.expression.getEnd();
  }

  toJSON():
    & {
      span: TextRange;
      type: TemplateSpanNode["type"];
      kind: TemplateSpanNode["kind"];
      children: (ToJSON<TaggedTemplateExpressionResult> | ToJSON<TemplateExpressionResult>)[];
    }
    & TextRange {
    return {
      ...super.toJSON(),
      span: this.span,
      children: this.children.map((child) => child.toJSON()),
    };
  }
}

export type ExtractResult = TaggedTemplateExpressionResult | TemplateExpressionResult | TemplateSpanResult;

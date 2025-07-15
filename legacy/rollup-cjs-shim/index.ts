import { factory, isCallExpression, isIdentifier, isMetaProperty, isPropertyAccessExpression, isVariableStatement, type Node, ScriptTarget, type SourceFile, SyntaxKind, type TransformerFactory, transpileModule, visitEachChild, visitNode } from "typescript";
import type { Plugin } from "rollup";

export interface ReplaceParams {
  match?: (node: Node) => boolean;
  replacement?: Node | ((node: Node) => Node);
  effects?: ReplaceParams[];
}

export const defaultReplacements: ReplaceParams[] = [
  // replace import.meta.dirname -> __dirname
  {
    match: (node) =>
      isPropertyAccessExpression(node) &&
      isMetaProperty(node.expression) &&
      node.expression.keywordToken === SyntaxKind.ImportKeyword &&
      node.name.text === "dirname",
    replacement: factory.createIdentifier("__dirname"),
  },
  // replace import.meta.filename -> __filename
  {
    match: (node) =>
      isPropertyAccessExpression(node) &&
      isMetaProperty(node.expression) &&
      node.expression.keywordToken === SyntaxKind.ImportKeyword &&
      node.name.text === "filename",
    replacement: factory.createIdentifier("__filename"),
  },
  // remove createRequire
  {
    match: (node) =>
      isVariableStatement(node) &&
      node.declarationList.declarations.some((decl) =>
        isIdentifier(decl.name) &&
        decl.name.text === "require" &&
        decl.initializer &&
        isCallExpression(decl.initializer) &&
        isIdentifier(decl.initializer.expression) &&
        decl.initializer.expression.text === "createRequire"
      ),
    replacement: undefined,
  },
  // remove global = globalThis
  {
    match: (node) =>
      isVariableStatement(node) &&
      node.declarationList.declarations.some((decl) =>
        isIdentifier(decl.name) &&
        decl.name.text === "global" &&
        decl.initializer &&
        isIdentifier(decl.initializer) &&
        decl.initializer.text === "globalThis"
      ),
    replacement: undefined,
  },
];

function createTransformer(replacements: ReplaceParams[]): TransformerFactory<SourceFile> {
  return ((context) => {
    const visitor = (node: Node): Node => {
      for (const replacement of replacements) {
        if (replacement.match?.(node)) {
          if (replacement.replacement === undefined) {
            return factory.createNotEmittedStatement(node);
          }

          const newNode = typeof replacement.replacement === "function"
            ? replacement.replacement(node)
            : replacement.replacement;

          if (replacement.effects) {
            return visitEachChild(newNode, visitor, context);
          }
          return newNode;
        }
      }
      return visitEachChild(node, visitor, context);
    };
    return (sourceFile) => visitNode(sourceFile, visitor);
  }) as TransformerFactory<SourceFile>;
}

function cjsShim({
  replacements = defaultReplacements,
}: {
  replacements?: ReplaceParams[];
} = {}): Plugin {
  return {
    name: "cjs-shim",
    transform(code: string, id) {
      const result = transpileModule(code, {
        transformers: {
          before: [createTransformer(replacements)],
        },
        compilerOptions: {
          sourceMap: true,
          target: ScriptTarget.ESNext,
        },
        fileName: id,
      });

      return {
        code: result.outputText,
        map: result.sourceMapText,
      };
    },
  };
}

export { cjsShim, cjsShim as default };

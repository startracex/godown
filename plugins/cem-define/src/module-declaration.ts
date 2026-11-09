import type { AnalyzePhaseParams } from "@custom-elements-manifest/analyzer";

import { exports } from "./exports.js";

export function analyzeModuleDeclaration({ ts, node, moduleDoc, context }: AnalyzePhaseParams) {
  if (!ts.isModuleDeclaration(node) || node.name.getText() !== "global") {
    return;
  }

  ts.forEachChild(node, (node1) => {
    if (!ts.isModuleBlock(node1)) {
      return;
    }

    for (const s of node1.statements) {
      if (!ts.isInterfaceDeclaration(s) || s.name.getText() !== "HTMLElementTagNameMap") {
        continue;
      }

      for (const m of s.members) {
        if (!ts.isPropertySignature(m)) {
          continue;
        }

        let elementTag: string | undefined;
        const name = m.name;

        if (ts.isStringLiteral(name)) {
          elementTag = name.getText().slice(1, -1);
        } else if (ts.isComputedPropertyName(name)) {
          if (name.getChildCount() === 3) {
            const literal = name.getChildAt(1);
            if (ts.isStringLiteral(literal)) {
              elementTag = literal.getText().slice(1, -1);
            }
          }
          if (!elementTag) {
            console.warn(`Computed tag name: ${name.getText()} skipped.`);
          }
        }

        if (elementTag && m.type) {
          const elementClass = m.type.getText();
          exports(elementTag, elementClass, { moduleDoc, context });
        }
      }
    }
  });
}

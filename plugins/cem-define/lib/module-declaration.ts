import { type AnalyzePhaseParams } from "@custom-elements-manifest/analyzer";

import { exports } from "./exports.js";

export function analyzeModuleDeclaration({
  ts,
  node,
  moduleDoc,
  context,
}: AnalyzePhaseParams) {
  if (ts.isModuleDeclaration(node) && node.name.getText() === "global") {
    ts.forEachChild(node, (
      node1,
    ) => {
      if (ts.isModuleBlock(node1)) {
        node1.statements.forEach(s => {
          if (ts.isInterfaceDeclaration(s) && s.name.getText() === "HTMLElementTagNameMap") {
            s.members.forEach((m) => {
              if (ts.isPropertySignature(m)) {
                let elementTag: string | undefined;
                if (ts.isStringLiteral(m.name)) {
                  elementTag = m.name.getText().slice(1, -1);
                } else if (ts.isComputedPropertyName(m.name)) {
                  if (m.name.getChildCount() === 3) {
                    const s = m.name.getChildAt(1);
                    if (ts.isStringLiteral(s)) {
                      elementTag = s.getText().slice(1, -1);
                    }
                  }
                  if (!elementTag) {
                    // eslint-disable-next-line no-console
                    console.warn(`Computed tag name:${m.name.getText()} skipped.`);
                  }
                }
                if (elementTag) {
                  const elementClass = m.type.getText();
                  exports(elementTag, elementClass, {
                    moduleDoc,
                    context,
                  });
                }
              }
            });
          }
        });
      }
    });
  }
}

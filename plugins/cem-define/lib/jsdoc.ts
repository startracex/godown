import { type AnalyzePhaseParams } from "@custom-elements-manifest/analyzer";
import type { JSDoc } from "typescript545";

import { exports } from "./exports.js";
function visitNode(
  match: string,
  {
    ts,
    node,
    moduleDoc,
    context,
  }: AnalyzePhaseParams & {
    node: {
      jsDoc?: JSDoc[];
    };
  },
) {
  if (node.jsDoc) {
    for (const doc of node.jsDoc) {
      if (doc.tags) {
        for (const tag of doc.tags) {
          const key = tag.tagName.getText();
          if (key === match) {
            const comments = tag.comment;
            let elementTag: string, elementClass: string;
            if (typeof comments !== "string") {
              if (comments.length >= 2) {
                const [c1, c2] = comments;

                elementTag = c1.getText().trim();

                if (ts.isJSDocLinkLike(c2)) {
                  elementClass = c2.name.getText();
                }
              }
            }
            exports(elementTag, elementClass, {
              moduleDoc,
              context,
            });
          }
        }
      }
    }
  }
  ts.forEachChild(node, (node) => visitNode(match, { ts, node, moduleDoc, context }));
}

export function analyzeJSDoc(match: string, params: AnalyzePhaseParams) {
  visitNode(match, params);
}

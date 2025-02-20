import type { AnalyzePhaseParams } from "@custom-elements-manifest/analyzer";
import { resolveModuleOrPackageSpecifier } from "@custom-elements-manifest/analyzer/src/utils/index.js";

export function exports(tagName: string, className: string, {
  moduleDoc,
  context,
}: Pick<AnalyzePhaseParams, "context" | "moduleDoc">) {
  if (!tagName || !className) {
    return;
  }
  const exports = moduleDoc.exports || [];
  const existingExport = exports.find((exportDoc: { kind: string; name: string; declaration: { name: string } }) =>
    exportDoc.kind === "custom-element-definition" &&
    exportDoc.name === tagName &&
    exportDoc.declaration?.name === className
  );

  if (!existingExport) {
    moduleDoc.exports = [...exports, {
      kind: "custom-element-definition",
      name: tagName,
      declaration: {
        name: className,
        ...resolveModuleOrPackageSpecifier(moduleDoc, context, className),
      },
    }];
  }
}

import type { IconifyIconBuildResult } from "@iconify/utils/lib/svg/build";

export default function (result: IconifyIconBuildResult) {
  return (
    "" +
    `import{icon}from"@godown/element/directives/icon.js";` +
    `export default icon("${result.attributes.viewBox}")` +
    `\`${result.body}\`;\n`
  );
}

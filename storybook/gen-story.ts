import { existsSync, writeFileSync } from "fs";
import { join } from "path/posix";

type CategoryType =
  | "display"
  | "feedback"
  | "input"
  | "layout"
  | "effect"
  | "navigation";

const formatStories = (category: CategoryType, name: string) => {
  const name0 = name.slice(0, 1).toUpperCase() + name.slice(1);
  return `import { ${name} } from "./${name}";

export default {
  title: "${category}/${name0}",
  component: "godown-${name}",
  tags: ["autodocs"],
  render: (args: any) => ${name}(args),
  argTypes: {
  },
  args: {
  },
};

export const Primary = {};
`;
};

const formatRender = (name: string) => {
  return `import "godown/${name}.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

export const ${name} = (args) => {
  return html\`
<godown-${name} \${attr(args)}></godown-${name}>
  \`;
};`;
};

export const genStory = (
  category: CategoryType,
  name: string,
) => {
  const fileName = join(import.meta.dirname, "category", category, name);
  const stories = fileName + ".stories.ts";
  const render = fileName + ".ts";
  if (!existsSync(stories)) {
    writeFileSync(stories, formatStories(category, name));
  }
  if (!existsSync(render)) {
    writeFileSync(render, formatRender(name));
  }
};

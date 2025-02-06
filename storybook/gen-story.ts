import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path/posix";

type CategoryType =
  | "display"
  | "feedback"
  | "input"
  | "layout"
  | "effect"
  | "navigation";

const camel = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const formatStories = (category: CategoryType, name: string) => {
  return `import type { RendererMeta } from "../../types";
import render from "./${name}";

export default {
  title: "${category}/${camel(name)}",
  component: "godown-${name}",
  tags: ["autodocs"],
  render,
  argTypes: {
  },
  args: {
  },
} as RendererMeta<typeof render>;

export const Primary = {};
`;
};

const formatRender = (name: string) => {
  return `import { attr } from "@godown/element";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Godown.${camel(name)}) => {
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

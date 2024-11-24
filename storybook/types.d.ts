declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

import { type Meta } from "@storybook/web-components";

export type RendererMeta<T extends (...args: any) => any> = Meta<Parameters<T>[0]>;

export type * as Godown from "godown/src/index.ts";

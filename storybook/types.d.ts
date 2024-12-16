import type { Meta } from "@storybook/web-components";

export type RendererMeta<T extends (...args: any) => any> = Meta<Parameters<T>[0]>;

export type * as Godown from "godown/src/index.ts";

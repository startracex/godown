import type { InputOptions } from "rollup";
import migrate from "rollup-plugin-oxc/migrate.js";
import type { Options } from "rollup-plugin-oxc";
import { isArray } from "sharekit";

import { json, oxc, typescript } from "./plugins.ts";
import { commonjs } from "./plugins.ts";

type EmitOptions = Omit<Options, "tsconfig"> & { tsconfig?: Exclude<Options["tsconfig"], string> };

export const setupOptions = (
  type: "rolldown" | "rollup" | undefined,
  emitOptions: EmitOptions = {},
  inputs: InputOptions = {},
): InputOptions & {
  resolve?: Exclude<Options["resolve"], false>;
  transform?: Exclude<Options["transform"], false>;
} => {
  const plugins = isArray(inputs.plugins) ? inputs.plugins : [inputs.plugins || []];

  const emitPlugins = [
    typescript(emitOptions.tsconfig.compilerOptions),
    oxc({
      ...emitOptions,
      transform: false,
    }),
  ];

  if (type === "rolldown") {
    inputs.plugins = [
      json({
        extensions: [".jsonc"],
      }),
      ...emitPlugins,
      ...plugins,
    ];
    Object.assign(inputs, {
      transform: {
        ...migrate(emitOptions.tsconfig?.compilerOptions),
        ...emitOptions.transform,
      },
      resolve: emitOptions.resolve || undefined,
    });
  } else {
    inputs.plugins = [json(), commonjs(), ...emitPlugins, ...plugins];
  }

  return inputs;
};

import { type ExternalOption, type InputOption, type OutputOptions, rollup } from "rollup";
import type { Options } from "rollup-plugin-oxc";
import { writeOutputs } from "./utils.ts";
import type { Result } from "postcss-load-config";
import rollupPlugins from "./rollup-plugins.ts";

const isValidInput = (input) => {
  if (typeof input === "object") {
    if (Array.isArray(input)) {
      return input.length > 0;
    }
    return Object.keys(input).length > 0;
  }
  return !!input;
};

export const build = async ({
  input,
  output,
  minify,
  postcss,
  compilerOptions,
  transform,
  resolve,
  external,
}: {
  packageJSON?: any;
  input?: InputOption;
  output?: OutputOptions | OutputOptions[];
  external?: ExternalOption;
  minify?: Options["minify"];
  transform?: Options["transform"];
  resolve?: Options["resolve"];
  compilerOptions?: Options["tsconfigCompilerOptions"];
  postcss?: Result;
} = {}): Promise<void> => {
  if (!isValidInput(input)) {
    return;
  }
  const bundle = await rollup({
    input: input,
    external,
    plugins: rollupPlugins({
      compilerOptions,
      minify,
      transform,
      resolve,
      postcss,
    }),
  });

  await writeOutputs(bundle, output);
  await bundle.close();
};

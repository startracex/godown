import { type InputOptions, type OutputOptions, rollup, type RollupOptions } from "rollup";

export const commonInput: Pick<InputOptions, "external" | "onwarn"> = {
  external: [
    "@",
    "lit",
    "tslib",
    "fmtime"
  ].map(s => new RegExp(`^${s}`)),

  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
};

export const commonOutput: Pick<
  OutputOptions,
  "format" | "preserveModules" | "sourcemap" | "sourcemapExcludeSources" | "virtualDirname"
> = {
  format: "esm",
  preserveModules: true,
  sourcemap: true,
  sourcemapExcludeSources: true,
  virtualDirname: "virtual",
};

export async function build<
  I extends RollupOptions,
  O extends OutputOptions,
  C extends (time?: number, output?: O, input?: I) => void,
>(
  i: I & { callback?: C; },
  o?: O | O[],
  c?: C,
) {
  const bundle = await rollup(i);
  const outputOpt = (o || i.output) as O | O[];
  const callback = c || i.callback;
  if (!outputOpt) {
    return;
  }
  const outputArray = Array.isArray(outputOpt) ? outputOpt : [
    outputOpt,
  ];

  for (const output of outputArray) {
    const start = process.hrtime();
    await bundle.write(output);
    const end = process.hrtime(start);
    const time = +(end[0] + end[1] / 1e9).toFixed(2);
    callback?.(time, output, i);
  }
}

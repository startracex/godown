export type Format = "amd" | "cjs" | "esm" | "iife" | "system" | "umd";
type ArrayAble<T> = T | T[];

interface OutputOption {
  minify?: boolean;
  external?: false | string[];
  name?: string;
  globals?: Record<string, string>;
  map?: boolean;
  dts?: boolean;
}

interface BuildConfig extends OutputOption {
  bundler?: "rollup" | "rolldown";
  outputs: ArrayAble<Record<Format, string | null>>;
}

export interface RuntimeConfig {
  manifest?: boolean;
  build?: BuildConfig;
  tsconfig?: string;
}

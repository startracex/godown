# rollup-plugin-prune-imports

A Rollup plugin to prune module imports.

This plugin is useful when removing useless side effects, such as pruning the export entry files of packages.

## Installation

```sh
npm i -D rollup-plugin-prune-imports
```

## Usage

rollup.config.js

```ts
import pruneImports from "rollup-plugin-prune-imports";

export default {
  input: "input.js",
  plugins: [
    pruneImports({
      include: "input.js",
      prune: {
        include: ["deps.js", "node_modules/some-package/main.js"],
      },
    }),
  ],
  output: {
    dir: "output",
    format: "es",
  },
};
```

rollup api

```ts
import pruneImports from "rollup-plugin-prune-imports";
import { rollup } from "rollup";

await (
  await rollup({
    input: "input.js",
    plugins: [
      pruneImports({
        include: "input.js",
        prune: {
          include: ["deps.js", "node_modules/some-package/main.js"],
        },
      }),
    ],
  })
).write({
  dir: "output",
  format: "es",
});
```

## Options

### `include` / `exclude`

- Filter which files the plugin processes.

### `prune.include` / `prune.exclude`

- Filter which files the plugin prunes.
- ⚠️ Expanding `prune.include` may cause unexpected errors.

## Example

`input.js`

```ts
import { bar, foo, quxx1 } from "./deps";
```

`deps.js`

`./foo`, `./bar`, `./baz`, `./qux` has side effects.

```ts
// 1. maintain: foo is used
export { foo, foo2 } from "./foo";

// 2. maintain: bar is used
import "./bar";
export { bar } from "./bar";

// 3. remove: no exports from ./baz
import "./baz";

// 4. remove: qux is unused
export { qux } from "./qux";
```

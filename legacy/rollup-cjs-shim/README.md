# rollup-plugin-cjs-shim

Rollup plugin to shim CJS modules.

Shims:

- Replaces `import.meta.filename` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
- Removes `createRequire`
- Removes `global = globalThis`

## Installation

```sh
npm i -D rollup-plugin-cjs-shim
```

## Usage

rollup.config.js

```js
import cjsShim from "rollup-plugin-cjs-shim";

export default {
  input: "index.js",
  output: {
    file: "index.cjs",
    format: "cjs",
  },
  plugins: [cjsShim()],
};
```

## Example

Input

```js
import { createRequire } from "module";
export const filename = import.meta.filename;
export const dirname = import.meta.dirname;

const require = createRequire(import.meta.url);
require("./package.json");
```

Output

```js
"use strict";

const filename = __filename;
const dirname = __dirname;

require("./package.json");

exports.dirname = dirname;
exports.filename = filename;
```

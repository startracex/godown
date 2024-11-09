es module to common js code helper

rollup.config.js

```js
import commonjs from "@rollup/plugin-commonjs";
import cjsShim from "rollup-plugin-cjs-shim";

export default {
  input: "index.js",
  output: {
    file: "index.cjs",
    format: "cjs",
  },
  plugins: [cjsShim(), commonjs()],
};
```

- `import.meta.filename` => \_\_filename
- `import.meta.dirname` => \_\_dirname
- `const/var/let require = createRequire(import.meta.url)` =>
  - `import { createRequire } from "module"` =>
- `(const|var|let) global = globalThis` =>

example input

```js
import { createRequire } from "module";
export const filename = import.meta.filename;
export const dirname = import.meta.dirname;

const require = createRequire(import.meta.url);

require("./package.json");
```

output

```js
"use strict";

const filename = __filename;
const dirname = __dirname;

require("./package.json");

exports.dirname = dirname;
exports.filename = filename;
```

add replacement

```js
import cjsShim, { defaultReplacements } from "rollup-plugin-cjs-shim";

cjsShim({
  replacements: [
    ...defaultReplacements,
    {
      // replacement
    },
  ],
});
```

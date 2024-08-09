# cem-plugin-fix-module

Fix module paths.

cem config

```js
import fixModule from "cem-plugin-fix-module";

export default {
  plugins: [fixModule((path) => path.replace(/\.ts$/, ".js"))],
};
```

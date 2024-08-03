# cem-plugin-define

Enhance `custom-element-definition` exports.

cem config

```js
import { jsDocDefine, moduleDeclarationDefine } from "cem-plugin-define";

export default {
  plugins: [
    jsDocDefine(
      /* Specify the doc tag. */
      "define"
    ),
    moduleDeclarationDefine(),
  ],
};
```

JSDoc comments and module declarations can be placed anywhere.

Tag name and element identifier need to be provided together.

```ts
class MyElement extends HTMLElement {}

/**
 * Using jsDocDefine:
 * 
 * Specify the element name and identifier through a JSDoc.
 *
 * @define my-element {@link MyElement}
 */

/**
 * Using moduleDeclarationDefine:
 * 
 * Globally Declare the element name and type in HTMLElementTagNameMap.
 */
declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
```

Computed property

Only string literal accepted.

```ts
declare global {
  interface HTMLElementTagNameMap {
    ["my-element"]: MyElement;
  }
}
```

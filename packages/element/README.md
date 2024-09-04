# @godown/element

Component base class for godown.

## Usage

```js
import GodownElement from "@godown/element";
import component from "@godown/element/decorators/component.js";

@component({
  tagName: "my-element",
  styles: [ /* ...styles */ ],
  autoDefine: true
})
class MyElement extents GodownElement {
}
```

```html
<my-element></my-element>
```

## With config.

```js
import GodownElement from "@godown/element";
import GodownConfig from "@godown/element/config.js";
import godown from "@godown/element/decorators/godown.js";
import styles from "@godown/element/decorators/styles.js";

@godown("element")
@styles(/* ...styles */)
class MyElement extents GodownElement {
  static godownConfig = new GodownConfig({
    prefix: "my",
  });
}

MyElement.define()
```

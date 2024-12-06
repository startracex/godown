# @godown/react

```sh
npm i @godown/react
```

This package provides empty conversion.

## Usage

JSX element

```jsx
import Alert from "@godown/react/alert";

export default function () {
  return <Alert title="Alert" />;
}
```

Intrinsic element

```jsx
import "@godown/react/alert";

export default function () {
  return <godown-alert title="Alert" />;
}
```

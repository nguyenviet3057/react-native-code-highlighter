# react-native-code-highlighter

![GitHub](https://img.shields.io/github/license/gmsgowtham/react-native-code-highlighter)
[![CI](https://github.com/gmsgowtham/react-native-code-highlighter/actions/workflows/ci.yml/badge.svg)](https://github.com/gmsgowtham/react-native-code-highlighter/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/gmsgowtham/react-native-code-highlighter/badge.svg?branch=main)](https://coveralls.io/github/gmsgowtham/react-native-code-highlighter?branch=main)
[![npm](https://img.shields.io/npm/v/react-native-code-highlighter)](https://www.npmjs.com/package/react-native-code-highlighter)
[![npm](https://img.shields.io/npm/dw/react-native-code-highlighter)](https://www.npmjs.com/package/react-native-code-highlighter)


Code/Syntax highlighter for React Native. Inspired by [react-native-syntax-highlighter](https://github.com/conorhastings/react-native-syntax-highlighter), using [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

This is a fork of [react-native-code-highlighter](https://github.com/gmsgowtham/react-native-code-highlighter), which uses View wrapper instead of ScrollView if you don't need scrolling, includes a small bug fix for line number sections.

## Installation

#### NPM

```sh
npm install @nguyenviet3057/react-native-code-highlighter react-syntax-highlighter
```

#### Yarn

```sh
yarn add @nguyenviet3057/react-native-code-highlighter react-syntax-highlighter
```

> Additional for typescript

#### NPM

```sh
npm install --save-dev @types/react-syntax-highlighter
```

#### Yarn

```sh
yarn add -D @types/react-syntax-highlighter
```

## Usage

### Props

| Prop                                                                                                   | Description                                                                                                       | Type                                                             | Optional |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------- |
| hljsStyle                                                                                              | Highlight.js style imported from `react-syntax-highlighter/dist/esm/styles/hljs`                                  | `{ [key: string]: React.CSSProperties }`                         | false    |
| textStyle                                                                                              | Style for the text text components. Note: `color` property will be overridden                                     | `StyleProp<TextStyle>`                                           | true     |
| viewProps                                                                                        | Props for the underlying view.                                                     | [ViewProps](https://reactnative.dev/docs/view#props) | true     |
| containerStyle                                                                                         | Deprecated. `containerStyle` for the underlying `ScrollView`. Use `scrollViewProps.contentContainerStyle` instead | `StyleProp<ViewStyle>`                                           | true     |
| [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) Props | Props supported by react-syntax-highlighter. i.e. `language`, `showLineNumbers`, `lineNumberStyle`,...                                                      |                                                                  |          |

<strong><span style="color: #facc15;">*Note</span></strong>: You should use `lineNumberStyle` prop to override react-syntax-highlighter default style, because it uses `em` unit which React Native does not support.

### Example

```tsx
import React from "react";
import { StyleSheet } from "react-native";
import CodeHighlighter from "@nguyenviet3057/react-native-code-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CODE_STR = `var hello = "world"`;

export default function HighlightComponent() {
	return (
		<CodeHighlighter
			hljsStyle={atomOneDarkReasonable}
			containerStyle={styles.codeContainer}
			textStyle={styles.text}
			language="typescript"
		>
			{CODE_STR}
		</CodeHighlighter>
	);
}

const styles = StyleSheet.create({
	codeContainer: {
		padding: 16,
		minWidth: "100%",
	},
	text: {
		fontSize: 16,
	},
});
```

> CodeSandbox: https://codesandbox.io/s/react-native-code-highligher-knfsyx?file=/src/App.js (For original repository)

## Screenshots

![Image](assets/example.png?raw=true "Image")

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

## Built using

- [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [trim-newlines](https://github.com/sindresorhus/trim-newlines)
- [css-to-react-native](https://github.com/styled-components/css-to-react-native)


<a href="https://www.buymeacoffee.com/gmsgowtham" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="width: 120px !important;" ></a>

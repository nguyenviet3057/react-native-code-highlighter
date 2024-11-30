import React, { type FunctionComponent, type ReactNode, useMemo } from "react";
import {
	type ScrollViewProps,
	type StyleProp,
	StyleSheet,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import SyntaxHighlighter, {
	type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { trimNewlines } from "trim-newlines";
import {
	type HighlighterStyleSheet,
	type ReactStyle,
	getRNStylesFromHljsStyle,
} from "./../utils/styles";

export interface CodeHighlighterProps extends SyntaxHighlighterProps {
	hljsStyle: ReactStyle;
	textStyle?: StyleProp<TextStyle>;
	scrollViewProps?: ScrollViewProps;
	/**
	 * @deprecated Use scrollViewProps.contentContainerStyle instead
	 */
	containerStyle?: StyleProp<ViewStyle>;
}

export const CodeHighlighter: FunctionComponent<CodeHighlighterProps> = ({
	children,
	textStyle,
	hljsStyle,
	viewProps,
	containerStyle,
	...rest
}) => {
	const stylesheet: HighlighterStyleSheet = useMemo(
		() => getRNStylesFromHljsStyle(hljsStyle),
		[hljsStyle],
	);

	const getStylesForNode = (node: rendererNode): TextStyle[] => {
		const classes: string[] = node.properties?.className ?? [];
		return classes
			.map((c: string) => stylesheet[c])
			.filter((c) => !!c) as TextStyle[];
	};

	const renderNode = (nodes: rendererNode[], keyPrefix = "row") =>
		nodes.reduce<ReactNode[]>((acc, node, index) => {
			const keyPrefixWithIndex = `${keyPrefix}_${index}`;
			if (node.children) {
				const styles = StyleSheet.flatten([
					textStyle,
					{ color: stylesheet.hljs?.color },
					getStylesForNode(node),
					(node.properties?.key as string)?.includes("line-number--") &&
						StyleSheet.flatten([
							{
								textAlign: "right" as
									| "right"
									| "auto"
									| "left"
									| "center"
									| "justify"
									| undefined,
								minWidth: 36,
								paddingRight: 16,
								color: "#242c40",
							},
							// StyleSheet.create(node.properties?.style), // This style uses width unit by `em`, so not work
						]),
				]);
				acc.push(
					node.children?.at(0)?.value ? (
						<Text style={[styles]} key={keyPrefixWithIndex}>
							{renderNode(node.children, `${keyPrefixWithIndex}_child`)}
						</Text>
					) : (
						<View
							style={[
								{ display: "flex", flexDirection: "row", flexWrap: "wrap" },
								styles,
							]}
							key={keyPrefixWithIndex}
						>
							{renderNode(node.children, `${keyPrefixWithIndex}_child`)}
						</View>
					),
				);
			}

			if (node.value) {
				acc.push(trimNewlines(String(node.value)));
			}

			return acc;
		}, []);

	const renderer = (props: rendererProps) => {
		const { rows } = props;
		return (
			<View
				{...viewProps}
				style={[
					stylesheet.hljs,
					viewProps?.contentContainerStyle,
					containerStyle,
				]}
			>
				<View onStartShouldSetResponder={() => true}>{renderNode(rows)}</View>
			</View>
		);
	};

	return (
		<SyntaxHighlighter
			{...rest}
			renderer={renderer}
			CodeTag={View}
			PreTag={View}
			style={{}}
			testID="react-native-code-highlighter"
		>
			{children}
		</SyntaxHighlighter>
	);
};

export default CodeHighlighter;

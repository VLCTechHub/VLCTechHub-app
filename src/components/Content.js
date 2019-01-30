import React from "react"
import { Platform, View, Text } from "react-native"
import STYLES from "../constants/styles"

import { iOSUIKit, material } from "react-native-typography"

export const DetailView = props => <View style={{ padding: STYLES.SPACING.MAJOR }}>{props.children}</View>

export const Title = props => (
	<Text
		style={{
			...Platform.select({ ios: iOSUIKit.largeTitleEmphasized, android: material.display1 }),
			marginBottom: STYLES.SPACING.MINOR,
		}}
	>
		{props.children}
	</Text>
)

export const Subtitle = props => (
	<Text
		{...props}
		style={{
			...Platform.select({ ios: iOSUIKit.bodyEmphasized, android: material.subheading }),
			...props.style,
		}}
	>
		{props.children}
	</Text>
)

export const Meta = props => (
	<Text
		style={{
			...Platform.select({ ios: iOSUIKit.footnote, android: material.body1 }),
			...props.style,
		}}
	>
		{props.children}
	</Text>
)

export const Description = props => (
	<Text
		style={{
			...Platform.select({ ios: iOSUIKit.body, android: material.subheading }),
			...props.style,
		}}
	>
		{props.children}
	</Text>
)

export const Tags = props => (
	<View
		style={{
			flexDirection: "row",
			marginRight: STYLES.SPACING.MINOR,
			...props.style,
		}}
	>
		{props.children}
	</View>
)

export const Tag = props => (
	<View
		style={{
			borderRightWidth: props.last ? 0 : 1,
			borderRightColor: STYLES.COLORS.GREY_LIGHTER,
			marginRight: STYLES.SPACING.MINOR,
			paddingRight: STYLES.SPACING.MINOR,
			justifyContent: "center",
			flexDirection: "column",
		}}
	>
		<Text
			style={{
				...iOSUIKit.footnote,
				color: STYLES.COLORS.GREY_LIGHT,
			}}
		>
			{props.children}
		</Text>
	</View>
)

export const Callout = props => (
	<View
		style={{
			padding: STYLES.SPACING.MAJOR,
			marginTop: STYLES.SPACING.MINOR,
			marginBottom: STYLES.SPACING.MAJOR,
			marginLeft: -STYLES.SPACING.MAJOR,
			width: STYLES.WIDTH,
			backgroundColor: STYLES.COLORS.PRIMARY_LIGHT,
		}}
	>
		<Text
			style={{
				...Platform.select({ ios: iOSUIKit.footnote, android: material.body1 }),
				color: STYLES.COLORS.PRIMARY_DARK,
			}}
		>
			SALARIO
		</Text>
		<Text
			style={{
				...Platform.select({ ios: iOSUIKit.footnote, android: material.body2 }),
				color: STYLES.COLORS.PRIMARY_DARK,
			}}
		>
			{props.children}
		</Text>
	</View>
)

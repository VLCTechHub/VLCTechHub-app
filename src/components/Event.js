import React from "react"
import { Animated, Image } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton, BaseButton } from "react-native-gesture-handler"
import { Item, ItemData } from "./Item"
import { Meta, Subtitle, Tags, Tag } from "./Content"
import { iOSColors } from "react-native-typography"

import { dateFormatted } from "../services/date"

import STYLES from "../constants/styles"

export default props => {
	const opacity = new Animated.Value(1)
	const date = dateFormatted(props.event.date)
	const renderLeftActions = () => (
		<RectButton
			style={{
				backgroundColor: iOSColors.red,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: STYLES.SPACING.MAJOR,
			}}
			onPress={() => {
				Animated.timing(opacity, {
					toValue: 0,
				}).start(() => props.disableEvent(props.event.id))
			}}
		>
			<Meta style={{ color: STYLES.COLORS.WHITE }}>Quitar</Meta>
		</RectButton>
	)
	const renderRightActions = () => (
		<RectButton
			style={{
				backgroundColor: iOSColors.green,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: STYLES.SPACING.MAJOR,
			}}
		>
			<Meta style={{ color: STYLES.COLORS.WHITE }}>Recordar</Meta>
		</RectButton>
	)
	return (
		<Animated.View style={{ opacity }}>
			<Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
				<BaseButton onPress={props.handleClick}>
					<Item white={props.index % 2 === 0}>
						<Image
							style={{ width: 50, height: 50, borderRadius: 24 }}
							source={{
								uri: `https://res.cloudinary.com/vlctechhub/image/twitter_name/w_240/${props.event.hashtag.slice(
									1,
								)}.jpg`,
							}}
						/>
						<ItemData>
							<Meta style={{ marginBottom: STYLES.SPACING.TINY }}>{date}</Meta>
							<Subtitle ellipsizeMode="tail" numberOfLines={1}>
								{props.event.title}
							</Subtitle>
							<Tags style={{ marginTop: STYLES.SPACING.TINY }}>
								{props.event.hashtag ? <Tag last>{props.event.hashtag}</Tag> : null}
							</Tags>
						</ItemData>
					</Item>
				</BaseButton>
			</Swipeable>
		</Animated.View>
	)
}

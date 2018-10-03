import React from "react"
import { TouchableHighlight } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Item, ItemData } from "./Item"
import { Meta, Subtitle, Tags, Tag } from "./Content"

import { dateFormatted } from "../services/date"

import STYLES from "../constants/styles"

export default props => {
	const date = dateFormatted(props.event.date)
	return (
		<TouchableHighlight onPress={props.handleClick} underlayColor={STYLES.COLORS.GREY_LIGHTER}>
			<Item white={props.index % 2 === 0}>
				<Feather name="calendar" size={25} style={{ color: STYLES.COLORS.GREY_LIGHT }} />
				<ItemData>
					<Meta>{date}</Meta>
					<Subtitle ellipsizeMode="tail" numberOfLines={1}>
						{props.event.title}
					</Subtitle>
					<Tags>{props.event.hashtag && <Tag last>{props.event.hashtag}</Tag>}</Tags>
				</ItemData>
			</Item>
		</TouchableHighlight>
	)
}

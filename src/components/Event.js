import React from "react"
import { TouchableHighlight, Image } from "react-native"

import { Item, ItemData } from "./Item"
import { Meta, Subtitle, Tags, Tag } from "./Content"

import { dateFormatted } from "../services/date"

import STYLES from "../constants/styles"

export default props => {
	const date = dateFormatted(props.event.date)
	return (
		<TouchableHighlight onPress={props.handleClick} underlayColor={STYLES.COLORS.GREY_LIGHTER}>
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
					<Meta>{date}</Meta>
					<Subtitle ellipsizeMode="tail" numberOfLines={1}>
						{props.event.title}
					</Subtitle>
					<Tags>{props.event.hashtag ? <Tag last>{props.event.hashtag}</Tag> : null}</Tags>
				</ItemData>
			</Item>
		</TouchableHighlight>
	)
}

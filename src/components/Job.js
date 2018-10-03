import React from "react"
import { View, ScrollView, TouchableHighlight, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Item, ItemData } from "./Item"
import { Meta, Subtitle, Tags, Tag, TagText } from "./Content"

import STYLES from "../constants/styles"

export default props => {
	var { width } = Dimensions.get("window")
	return (
		<Item white={props.index % 2 === 0}>
			<Feather name="briefcase" size={25} style={{ color: STYLES.COLORS.GREY_LIGHT }} />
			<ItemData>
				<TouchableHighlight onPress={props.handleClick} underlayColor="transparent">
					<View>
						<Meta>{props.job.company.name}</Meta>
						<Subtitle ellipsizeMode="tail" numberOfLines={1}>
							{props.job.title}
						</Subtitle>
					</View>
				</TouchableHighlight>
				<ScrollView
					style={{ width: width - 50 }}
					directionalLockEnabled={true}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				>
					<Tags>
						{props.job.tags &&
							props.job.tags.map((tag, index) => (
								<Tag key={index} last={index === props.job.tags.length - 1}>
									{tag}
								</Tag>
							))}
					</Tags>
				</ScrollView>
			</ItemData>
		</Item>
	)
}

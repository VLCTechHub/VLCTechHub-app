import React from "react"
import { View, ScrollView, TouchableHighlight, Dimensions } from "react-native"

import { Item, ItemData } from "./Item"
import { Meta, Subtitle, Tags, Tag, TagText } from "./Content"

import STYLES from "../constants/styles"

export default props => {
	var { width } = Dimensions.get("window")
	return (
		<Item white={props.index % 2 === 0}>
			<ItemData noPadding>
				<TouchableHighlight onPress={props.handleClick} underlayColor="transparent">
					<View>
						<Meta style={{ marginBottom: STYLES.SPACING.TINY }}>{props.job.company.name}</Meta>
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
					<Tags style={{ marginTop: STYLES.SPACING.TINY }}>
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

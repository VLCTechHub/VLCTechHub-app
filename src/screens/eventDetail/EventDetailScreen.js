import React from "react"
import { SafeAreaView, Animated, Linking, StyleSheet, Platform } from "react-native"
import { DetailView, Title, Subtitle, Description } from "../../components/Content"
import AnimatedHeader from "../../components/AnimatedHeader"
import Button from "../../components/Button"

import STYLES from "../../constants/styles"

import { dateFormatted } from "../../services/date"

const headerRatio = 16 / 9
const headerHeight = STYLES.WIDTH / headerRatio

export default class EventDetailScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}

	scrollY = new Animated.Value(0)

	buttonPressHandler(event) {
		Linking.openURL(event.link)
	}

	render() {
		const event = this.props.navigation.getParam("event")
		const date = dateFormatted(event.date)
		return (
			<SafeAreaView>
				<AnimatedHeader
					headerHeight={headerHeight}
					scrollY={this.scrollY}
					headerTitle={event.hashtag}
					headerImage={require("../../../assets/talk.jpg")}
					onBackPress={() => this.props.navigation.goBack()}
				/>
				<Animated.ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollViewContent}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: { y: this.scrollY },
								},
							},
						],
						{ useNativeDriver: false },
					)}
				>
					<DetailView>
						<Title>{event.title}</Title>
						<Subtitle>{date}</Subtitle>
						<Description>{event.description}</Description>
						<Button onPress={() => this.buttonPressHandler(event)}>Más información</Button>
					</DetailView>
				</Animated.ScrollView>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: STYLES.COLORS.WHITE,
	},
	scrollViewContent: {
		paddingTop: headerHeight,
	},
})

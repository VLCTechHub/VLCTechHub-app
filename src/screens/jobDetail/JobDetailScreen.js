import React from "react"
import { SafeAreaView, Animated, Linking, StyleSheet, View } from "react-native"
import { DetailView, Title, Description, Subtitle, Callout } from "../../components/Content"
import Button from "../../components/Button"
import AnimatedHeader from "../../components/AnimatedHeader"
import Divider from "../../components/Divider"

import STYLES from "../../constants/styles"

const headerRatio = 16 / 9
const headerHeight = STYLES.WIDTH / headerRatio
export default class JobDetailScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}

	scrollY = new Animated.Value(0)

	buttonPressHandler(job) {
		Linking.openURL(job.link)
	}

	render() {
		const job = this.props.navigation.getParam("job")

		return (
			<SafeAreaView style={styles.scrollViewContainer}>
				<AnimatedHeader
					headerHeight={headerHeight}
					scrollY={this.scrollY}
					headerTitle={job.company.name}
					headerImage={require("../../../assets/job.jpg")}
					onBackPress={() => this.props.navigation.goBack()}
					externalLinkPress={job.link && (() => this.buttonPressHandler(job))}
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
						<Title>{job.title}</Title>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Subtitle>{job.company.name}</Subtitle>
							<Subtitle style={{ color: STYLES.COLORS.GREY_LIGHT }}>{job.salary}</Subtitle>
						</View>
						<Divider />
						<Description>{job.description}</Description>
						{job.link ? (
							<Button onPress={() => this.buttonPressHandler(job)}>Más información</Button>
						) : null}
					</DetailView>
				</Animated.ScrollView>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	scrollViewContainer: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		backgroundColor: STYLES.COLORS.WHITE,
	},
	scrollViewContent: {
		paddingTop: headerHeight,
	},
})

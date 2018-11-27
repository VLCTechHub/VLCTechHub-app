import React from "react"
import { connect } from "react-redux"
import { Platform } from "react-native"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import { Feather } from "@expo/vector-icons"

import Alarm from "../components/Alarm"

import EventsScreen from "./events/EventsScreen"
import JobsScreen from "./jobs/JobsScreen"
import EventDetailScreen from "./eventDetail/EventDetailScreen"
import JobDetailScreen from "./jobDetail/JobDetailScreen"

import STYLES from "../constants/styles"
import { getLocalPermissionsStatus } from "../actions/notifications"

const routes = {
	Events: EventsScreen,
	Jobs: JobsScreen,
}

const options = {
	navigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state
			let iconName
			if (routeName === "Events") {
				iconName = `calendar`
			} else if (routeName === "Jobs") {
				iconName = `briefcase`
			}
			return <Feather name={iconName} size={25} color={tintColor} />
		},
	}),
	tabBarOptions: {
		activeBackgroundColor: STYLES.COLORS.PRIMARY,
		inactiveBackgroundColor: STYLES.COLORS.PRIMARY,
		activeTintColor: STYLES.COLORS.BLACK,
		inactiveTintColor: STYLES.COLORS.PRIMARY_DARK,
		backgroundColor: STYLES.COLORS.PRIMARY,
		style: {
			backgroundColor: STYLES.COLORS.PRIMARY,
		},
	},
	activeColor: STYLES.COLORS.BLACK,
	inactiveColor: STYLES.COLORS.PRIMARY_DARK,
	barStyle: {
		backgroundColor: STYLES.COLORS.PRIMARY,
	},
}

const TabsBottom = createBottomTabNavigator(routes, options)
const TabsTop = createMaterialBottomTabNavigator(routes, options)

const StackNavigator = createStackNavigator(
	{
		Tabs: {
			screen: Platform.select({
				ios: TabsBottom,
				android: TabsTop,
			}),
			navigationOptions: ({ navigation }) => {
				const type = navigation.state.index === 0 ? "events" : "jobs"
				return {
					headerTitle: type === "events" ? "Próximos eventos" : "Ofertas de trabajo",
					headerRight: <Alarm type={type} />,
					headerBackTitle: "Back",
					headerTintColor: STYLES.COLORS.PRIMARY_DARK,
					headerStyle: {
						backgroundColor: STYLES.COLORS.PRIMARY,
						borderBottomWidth: 1,
						borderBottomColor: STYLES.COLORS.GREY_LIGHTER,
					},
				}
			},
		},
		EventDetail: {
			screen: EventDetailScreen,
		},
		JobDetail: {
			screen: JobDetailScreen,
		},
	},
	{
		headerLayoutPreset: "center",
	},
)

class MainScreen extends React.Component {
	componentDidMount() {
		this.props.dispatchGetLocalPermissionsStatus()
	}

	render() {
		return <StackNavigator />
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchGetLocalPermissionsStatus: () => dispatch(getLocalPermissionsStatus()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MainScreen)

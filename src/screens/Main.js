import React from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import { Feather } from "@expo/vector-icons"

import LogoTitle from "../components/LogoTitle"

import EventsScreen from "./events/EventsScreen"
import JobsScreen from "./jobs/JobsScreen"
import EventDetailScreen from "./eventDetail/EventDetailScreen"
import JobDetailScreen from "./jobDetail/JobDetailScreen"

import STYLES from "../constants/styles"

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

export default createStackNavigator(
	{
		Tabs: {
			screen: Platform.select({
				ios: TabsBottom,
				android: TabsTop,
			}),
			navigationOptions: ({ navigation }) => {
				return {
					headerTitle: <LogoTitle />,
					headerBackTitle: "Back",
					headerTintColor: STYLES.COLORS.WHITE,
					headerStyle: {
						backgroundColor: STYLES.COLORS.WHITE,
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

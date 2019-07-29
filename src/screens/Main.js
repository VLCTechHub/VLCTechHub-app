import React from "react"
import { AppLoading, Notifications } from "expo"
import { Asset } from "expo-asset"
import Constants from "expo-constants"
import { connect } from "react-redux"
import { View, SafeAreaView, Platform, AsyncStorage, Linking, Text } from "react-native"
import {
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
    DrawerItems,
} from "react-navigation"

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import { Feather, AntDesign } from "@expo/vector-icons"

import Alarm from "../components/Alarm"
import ToggleMenu from "../components/ToggleMenu"

import EventsScreen from "./events/EventsScreen"
import JobsScreen from "./jobs/JobsScreen"
import EventDetailScreen from "./eventDetail/EventDetailScreen"
import JobDetailScreen from "./jobDetail/JobDetailScreen"
import OnboardingScreen from "./onboarding/OnboardingScreen"
import PublishNavigator from "./publish/PublishNavigator"
import PrivacyNavigator from "./privacy/PrivacyNavigator"

import STYLES from "../constants/styles"
import { getLocalPermissionsStatus, broadcastIncomingNotification } from "../actions/notifications"
import { Meta } from "../components/Content"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

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
                    headerLeft: <ToggleMenu navigation={navigation} />,
                    headerRight: <Alarm type={type} />,
                    headerBackTitle: null,
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

const DrawerNavigator = createDrawerNavigator(
    {
        Stack: {
            screen: StackNavigator,
            navigationOptions: {
                drawerLabel: "VLCTechHub",
                drawerIcon: <AntDesign name={`earth`} size={16} color={STYLES.COLORS.PRIMARY_DARK} />,
            },
        },
        PublishEvent: {
            screen: PublishNavigator,
            navigationOptions: {
                drawerLabel: "Publica un evento",
                drawerIcon: <AntDesign name={`calendar`} size={16} color={STYLES.COLORS.PRIMARY_DARK} />,
            },
        },
        PublishJob: {
            screen: PublishNavigator,
            navigationOptions: {
                drawerLabel: "Publica una oferta de trabajo",
                drawerIcon: <AntDesign name={`laptop`} size={16} color={STYLES.COLORS.PRIMARY_DARK} />,
            },
        },
        Privacy: {
            screen: PrivacyNavigator,
            navigationOptions: {
                drawerLabel: "Política de privacidad",
                drawerIcon: <AntDesign name={`eyeo`} size={16} color={STYLES.COLORS.PRIMARY_DARK} />,
            },
        },
    },
    {
        drawerBackgroundColor: STYLES.COLORS.GREY_LIGHTEST,
        contentComponent: props => (
            <SafeAreaView
                style={{
                    flex: 1,
                    height: STYLES.HEIGHT,
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
                forceInset={{ top: "always", horizontal: "never" }}
            >
                <View>
                    <MaterialIcons
                        name={"close"}
                        size={24}
                        style={{ margin: STYLES.SPACING.MIDDLE }}
                        onPress={() => props.navigation.toggleDrawer()}
                    />
                    <DrawerItems
                        {...props} // make sure all the regular stuff gets passed down a self-defined CustomDrawer
                        onItemPress={({ route, focused }) => {
                            if (route.routeName === "PublishEvent" || route.routeName === "PublishJob") {
                                props.navigation.toggleDrawer()
                                const target =
                                    route.routeName === "PublishEvent"
                                        ? "https://vlctechhub.org/events/new"
                                        : "https://vlctechhub.org/job/new"
                                Linking.openURL(target)
                                return
                            }
                            return props.onItemPress({ route, focused })
                        }}
                    />
                </View>
                <Meta
                    style={{
                        // fontFamily: STYLES.FONTS.TEXT,
                        color: STYLES.COLORS.GREY_LIGHT,
                        marginBottom: STYLES.SPACING.MAJOR,
                        marginLeft: STYLES.SPACING.MAJOR,
                    }}
                >
                    Copyright © 2019 Marcel Kalveram
                </Meta>
            </SafeAreaView>
        ),
        contentOptions: {
            activeBackgroundColor: STYLES.COLORS.PRIMARY_LIGHT,
            activeTintColor: STYLES.COLORS.PRIMARY_DARK,
            inactiveTintColor: STYLES.COLORS.PRIMARY_DARK,
            itemsContainerStyle: {
                marginTop: Constants.statusBarHeight,
            },
            iconContainerStyle: {
                marginRight: STYLES.SPACING.MINOR,
            },
            labelStyle: {
                marginLeft: 0,
            },
            onItemPress: route => {
                // console.log(route)
            },
        },
    },
)

class MainScreen extends React.Component {
    state = {
        showOnboardingLoading: true,
        showOnboarding: true,
        isReady: false,
    }
    componentDidMount() {
        this.props.dispatchGetLocalPermissionsStatus()
        Notifications.addListener(this.handleNotification)
        AsyncStorage.getItem("onboardingPlayed", (err, result) => {
            this.setState({ showOnboardingLoading: false })
            // this.setState({ showOnboarding: result === "true" ? false : true })
        })
    }

    handleNotification = notification => {
        if (notification.origin === "selected") {
            this.props.dispatchBroadcastIncomingNotification(notification.data)
        }
    }

    async _cacheResourcesAsync() {
        const images = [
            require("../../assets/onboarding-valencia.jpg"),
            require("../../assets/onboarding-events.jpg"),
            require("../../assets/onboarding-work.jpg"),
            require("../../assets/splash-transparent.png"),
        ]

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync()
        })
        return Promise.all(cacheImages)
    }

    render() {
        if (this.state.showOnboardingLoading || !this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                />
            )
        }

        const initialRouteName = this.state.showOnboarding ? "Onboarding" : "Drawer"

        const SwitchNavigator = createSwitchNavigator(
            {
                Onboarding: { screen: OnboardingScreen },
                Drawer: { screen: DrawerNavigator },
            },
            {
                initialRouteName,
            },
        )

        return <SwitchNavigator />
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchGetLocalPermissionsStatus: () => dispatch(getLocalPermissionsStatus()),
        dispatchBroadcastIncomingNotification: data => dispatch(broadcastIncomingNotification(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainScreen)

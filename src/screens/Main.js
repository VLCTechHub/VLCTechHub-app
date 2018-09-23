import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Feather } from "@expo/vector-icons";

import EventsScreen from "./events/EventsScreen";
import JobsScreen from "./jobs/JobsScreen";
import EventDetailScreen from "./eventDetail/EventDetailScreen";
import JobDetailScreen from "./jobDetail/JobDetailScreen";

import STYLES from "../constants/styles";

const Tabs = createBottomTabNavigator(
  {
    Events: EventsScreen,
    Jobs: JobsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Events") {
          iconName = `calendar`;
        } else if (routeName === "Jobs") {
          iconName = `briefcase`;
        }
        return <Feather name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeBackgroundColor: STYLES.COLORS.PRIMARY,
      inactiveBackgroundColor: STYLES.COLORS.PRIMARY,
      activeTintColor: STYLES.COLORS.BLACK,
      inactiveTintColor: STYLES.COLORS.PRIMARY_DARK
    }
  }
);

export default createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Valencia Tech Hub",
        headerBackTitle: "Back",
        headerTintColor: STYLES.COLORS.BLACK,
        headerStyle: { backgroundColor: STYLES.COLORS.PRIMARY }
      };
    }
  },
  EventDetail: {
    screen: EventDetailScreen
  },
  JobDetail: {
    screen: JobDetailScreen
  }
});

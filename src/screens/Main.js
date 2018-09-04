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
    })
  }
);

export default createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => {
      return {
        title: "VlcTechHub",
        headerBackTitle: "Back"
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

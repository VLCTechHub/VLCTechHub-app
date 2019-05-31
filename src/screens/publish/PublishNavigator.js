import React from "react"
import { WebView, StyleSheet } from "react-native"
import { createStackNavigator } from "react-navigation"

import ToggleMenu from "../../components/ToggleMenu"
import STYLES from "../../constants/styles"

class PublishScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: STYLES.COLORS.PRIMARY_LIGHT,
            },
            headerTintColor: STYLES.COLORS.PRIMARY_DARK,
            headerTitleStyle: {
                fontWeight: "bold",
            },
            title: "Publica un evento",
            headerLeft: <ToggleMenu navigation={navigation} />,
        }
    }

    render() {
        return <WebView style={styles.webview} source={{ uri: "https://vlctechhub.org/events/new" }} />
    }
}

export default createStackNavigator({ publish: PublishScreen })

const styles = StyleSheet.create({
    webview: {
        flex: 1,
    },
})

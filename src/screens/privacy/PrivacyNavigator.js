import React from "react"
import { WebView, StyleSheet } from "react-native"
import { createStackNavigator } from "react-navigation"

import { Feather, AntDesign } from "@expo/vector-icons"
import ToggleMenu from "../../components/ToggleMenu"
import STYLES from "../../constants/styles"

class PrivacyScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: STYLES.COLORS.PRIMARY_LIGHT,
            },
            headerTintColor: STYLES.COLORS.PRIMARY_DARK,
            headerTitleStyle: {
                fontWeight: "bold",
            },
            title: "Política de privacidad",
            headerLeft: <ToggleMenu navigation={navigation} />,
        }
    }

    render() {
        return <WebView style={styles.webview} source={{ uri: "http://marcelkalveram.com/privacy" }} />
    }
}

export default createStackNavigator({ publish: PrivacyScreen })

const styles = StyleSheet.create({
    webview: {
        flex: 1,
    },
})

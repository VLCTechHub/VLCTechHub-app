import React from "react"
import { View, Dimensions } from "react-native"

export default props => (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {props.children}
    </View>
)

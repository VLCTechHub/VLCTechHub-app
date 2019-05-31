import React from "react"
import { TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

import STYLES from "../constants/styles"

export default props => (
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Feather name={"menu"} size={24} style={{ marginLeft: 12, color: STYLES.COLORS.PRIMARY_DARK }} />
    </TouchableOpacity>
)

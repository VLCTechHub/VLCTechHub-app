import React from "react"
import Entypo from "@expo/vector-icons/Entypo"

import CenteredView from "./CenteredView"
import { Subtitle } from "./Content"

import STYLES from "../constants/styles"

export default props => (
    <CenteredView>
        <Entypo name="emoji-sad" size={64} color={STYLES.COLORS.GREY} />
        <Subtitle
            style={{
                width: 200,
                marginTop: STYLES.SPACING.MINOR,
                textAlign: "center",
                lineHeight: 24,
            }}
        >
            {props.children}
        </Subtitle>
    </CenteredView>
)

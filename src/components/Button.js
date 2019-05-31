import React from "react"
import { TouchableHighlight, Text, View } from "react-native"
import STYLES from "../constants/styles"
import { MaterialIcons } from "@expo/vector-icons"

export default props => (
    <TouchableHighlight
        style={{
            backgroundColor: props.disabled ? STYLES.COLORS.PRIMARY_LIGHT : STYLES.COLORS.PRIMARY,
            borderRadius: STYLES.SPACING.MAJOR,
            paddingVertical: props.small
                ? props.component
                    ? STYLES.SPACING.TINY + 2
                    : STYLES.SPACING.MINOR
                : STYLES.SPACING.MAJOR,
            paddingHorizontal: STYLES.SPACING.MAJOR,
            justifyContent: "center",
            alignItems: "center",
            marginTop: props.small ? 0 : STYLES.SPACING.MAJOR,
            width: props.small ? 120 : "auto",
        }}
        onPress={props.onPress}
        underlayColor="transparent"
    >
        {props.component ? (
            props.component
        ) : (
            <View
                style={{
                    width: props.small ? 110 : "auto",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {props.small && (
                    <MaterialIcons
                        size={16}
                        name={props.disabled ? "alarm-off" : "alarm-on"}
                        color={STYLES.COLORS.PRIMARY_DARK}
                        style={{ marginRight: STYLES.SPACING.TINY }}
                    />
                )}
                <Text
                    style={{
                        fontSize: props.small ? STYLES.FONTS.TEXT : STYLES.FONTS.SUBTITLE,
                        color: props.small ? STYLES.COLORS.PRIMARY_DARK : STYLES.COLORS.BLACK,
                        fontWeight: STYLES.BOLD,
                    }}
                >
                    {props.children}
                </Text>
            </View>
        )}
    </TouchableHighlight>
)

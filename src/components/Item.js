import React from "react";
import { View } from "react-native";
import STYLES from "../constants/styles";

export const Item = props => (
  <View
    style={{
      width: STYLES.WIDTH,
      borderBottomWidth: 1,
      borderBottomColor: STYLES.COLORS.GREY_LIGHTER,
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: STYLES.SPACING.MAJOR,
      paddingVertical: STYLES.SPACING.MINOR
    }}
  >
    {props.children}
  </View>
);

export const ItemData = props => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      paddingLeft: STYLES.SPACING.MAJOR
    }}
  >
    {props.children}
  </View>
);

import React from "react";
import { TouchableHighlight, Text } from "react-native";
import STYLES from "../constants/styles";

export default props => (
  <TouchableHighlight
    style={{
      backgroundColor: STYLES.COLORS.PRIMARY,
      borderRadius: STYLES.SPACING.MAJOR,
      padding: STYLES.SPACING.MAJOR,
      justifyContent: "center",
      alignItems: "center",
      marginTop: STYLES.SPACING.MAJOR
    }}
    onPress={props.onPress}
  >
    <Text style={{ fontSize: STYLES.FONTS.SUBTITLE, fontWeight: "bold" }}>
      {props.children}
    </Text>
  </TouchableHighlight>
);

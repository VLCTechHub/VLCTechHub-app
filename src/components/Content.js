import React from "react";
import { View, Text } from "react-native";
import STYLES from "../constants/styles";

export const DetailView = props => (
  <View style={{ padding: STYLES.SPACING.MAJOR }}>{props.children}</View>
);

export const Title = props => (
  <Text
    style={{ fontSize: STYLES.FONTS.TITLE, marginBottom: STYLES.SPACING.MAJOR }}
  >
    {props.children}
  </Text>
);

export const Subtitle = props => (
  <Text
    style={{
      fontSize: STYLES.FONTS.SUBTITLE,
      lineHeight: STYLES.LINE_HEIGHT,
      color: STYLES.COLORS.GREY
    }}
  >
    {props.children}
  </Text>
);

export const Meta = props => (
  <Text
    style={{
      fontSize: STYLES.FONTS.TEXT,
      lineHeight: STYLES.LINE_HEIGHT,
      color: STYLES.COLORS.SECONDARY_LIGHT
    }}
  >
    {props.children}
  </Text>
);

export const Description = props => (
  <Text
    style={{
      fontSize: STYLES.FONTS.SUBTITLE,
      lineHeight: STYLES.LINE_HEIGHT,
      marginTop: STYLES.SPACING.MAJOR
    }}
  >
    {props.children}
  </Text>
);

export const Tags = props => (
  <View
    style={{
      flexDirection: "row",
      marginRight: STYLES.SPACING.MINOR,
      marginTop: (STYLES.SPACING.MINOR / 3) * 2
    }}
  >
    {props.children}
  </View>
);

export const Tag = props => (
  <View
    style={{
      marginRight: STYLES.SPACING.MINOR,
      marginBottom: STYLES.SPACING.MINOR,
      backgroundColor: STYLES.COLORS.GREY_LIGHTER,
      borderRadius: 12,
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <Text
      style={{
        fontSize: STYLES.FONTS.TEXT,
        color: STYLES.COLORS.BLACK,
        lineHeight: 32,
        paddingHorizontal: STYLES.SPACING.MINOR
      }}
    >
      {props.children}
    </Text>
  </View>
);

export const Callout = props => (
  <View
    style={{
      padding: STYLES.SPACING.MAJOR,
      marginTop: STYLES.SPACING.MAJOR,
      backgroundColor: STYLES.COLORS.PRIMARY_LIGHT,
      borderRadius: 12
    }}
  >
    <Text
      style={{
        fontSize: STYLES.FONTS.TEXT,
        fontWeight: "bold",
        lineHeight: STYLES.LINE_HEIGHT
      }}
    >
      SALARY
    </Text>
    <Text
      style={{
        fontSize: STYLES.FONTS.TEXT,
        lineHeight: (STYLES.LINE_HEIGHT / 3) * 2
      }}
    >
      {props.children}
    </Text>
  </View>
);

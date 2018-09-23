import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default {
  WIDTH: width,
  HEIGHT: height,
  SPACING: {
    MAJOR: 16,
    MINOR: 8
  },
  FONTS: {
    TITLE: 24,
    SUBTITLE: 16,
    TEXT: 12
  },
  LINE_HEIGHT: 24,
  COLORS: {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    GREY: "#303030",
    GREY_LIGHT: "#CCCCCC",
    GREY_LIGHTER: "#EEEEEE",
    PRIMARY: "#FDD951",
    PRIMARY_LIGHT: "#FFEA99",
    PRIMARY_DARK: "#BC9810",
    SECONDARY: "#143F7B",
    SECONDARY_LIGHT: "#6088BF"
  }
};

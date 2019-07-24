import React from "react"
import Constants from "expo-constants"
import { Platform, Image, View, TouchableHighlight, Animated, StyleSheet } from "react-native"
import { HeaderBackButton } from "react-navigation"
import { Feather } from "@expo/vector-icons"

import STYLES from "../constants/styles"

const isX = Platform.OS === "ios" && (STYLES.HEIGHT > 800 || STYLES.width > 800) ? true : false

const toolbarHeight = Platform.OS === "android" ? 77 : isX ? 77 : 60
const titleTranslateValue = Platform.OS === "android" ? 9 : isX ? 14 : 6
const backButtonTop = Constants.statusBarHeight + (Platform.OS === "android" ? 0 : isX ? -12 : -2)
const externalLinkTop = Constants.statusBarHeight + (Platform.OS === "android" ? 16 : isX ? -3 : 5)

AnimatedHeaderBackButton = Animated.createAnimatedComponent(HeaderBackButton)
AnimatedFeather = Animated.createAnimatedComponent(Feather)

export default class AnimatedHeader extends React.Component {
    headerTranslateY = this.props.scrollY.interpolate({
        inputRange: [0, this.props.headerHeight],
        outputRange: [0, -this.props.headerHeight],
        extrapolate: "clamp",
    })

    toolbarOpacity = this.props.scrollY.interpolate({
        inputRange: [this.props.headerHeight - toolbarHeight - 24, this.props.headerHeight - toolbarHeight],
        outputRange: [0, 1],
        extrapolate: "clamp",
    })

    titleTranslateY = this.props.scrollY.interpolate({
        inputRange: [0, this.props.headerHeight - toolbarHeight],
        outputRange: [0, -(this.props.headerHeight - toolbarHeight) / 2 + titleTranslateValue],
        extrapolate: "clamp",
    })

    titleScale = this.props.scrollY.interpolate({
        inputRange: [0.0, this.props.headerHeight - toolbarHeight],
        outputRange: [1.5, 1.0],
        extrapolate: "clamp",
    })

    headerOpacity = this.props.scrollY.interpolate({
        inputRange: [0, this.props.headerHeight - toolbarHeight],
        outputRange: [0.33, 1],
        extrapolate: "clamp",
    })

    headerOpacityReversed = this.props.scrollY.interpolate({
        inputRange: [0, this.props.headerHeight - toolbarHeight],
        outputRange: [0.33, 0],
        extrapolate: "clamp",
    })

    textColor = this.props.scrollY.interpolate({
        inputRange: [0, this.props.headerHeight - toolbarHeight],
        outputRange: [STYLES.COLORS.WHITE, STYLES.COLORS.PRIMARY_DARK],
        extrapolate: "clamp",
    })

    render() {
        return (
            <View style={[styles.articleHeaderContainer, { height: this.props.headerHeight }]}>
                <Animated.View
                    style={[
                        styles.toolbar,
                        {
                            backgroundColor: STYLES.COLORS.PRIMARY,
                            opacity: this.toolbarOpacity,
                        },
                    ]}
                />
                <View style={styles.backButton}>
                    <AnimatedHeaderBackButton onPress={this.props.onBackPress} tintColor={this.textColor} />
                </View>
                {this.props.externalLinkPress ? (
                    <TouchableHighlight
                        onPress={this.props.externalLinkPress}
                        style={styles.externalLink}
                        underlayColor="transparent"
                    >
                        <AnimatedFeather style={{ color: this.textColor }} name="external-link" size={24} />
                    </TouchableHighlight>
                ) : null}
                <Animated.View
                    style={[
                        styles.articleHeader,
                        {
                            height: this.props.headerHeight,
                            transform: [{ translateY: this.headerTranslateY }],
                        },
                    ]}
                >
                    <Image
                        style={[styles.articleHeaderImage, { height: this.props.headerHeight }]}
                        resizeMode="cover"
                        source={this.props.headerImage}
                    />
                    <Animated.View
                        style={[
                            styles.articleHeader,
                            {
                                height: this.props.headerHeight,
                                zIndex: 2,
                                backgroundColor: STYLES.COLORS.PRIMARY,
                                opacity: this.headerOpacity,
                            },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.articleHeader,
                            {
                                height: this.props.headerHeight,
                                zIndex: 3,
                                backgroundColor: STYLES.COLORS.BLACK,
                                opacity: this.headerOpacityReversed,
                            },
                        ]}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.titleContainer,
                        {
                            top: this.props.headerHeight / 2 - STYLES.FONTS.SUBTITLE / 2,
                            transform: [{ translateY: this.titleTranslateY }, { scale: this.titleScale }],
                        },
                    ]}
                >
                    <Animated.Text style={[styles.title, { color: this.textColor }]}>
                        {this.props.headerTitle}
                    </Animated.Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    articleHeaderContainer: {
        width: STYLES.WIDTH,
        position: "absolute",
        zIndex: 2,
    },
    articleHeader: {
        backgroundColor: "transparent",
        width: STYLES.WIDTH,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    articleHeaderImage: {
        width: STYLES.WIDTH,
    },
    toolbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        elevation: 3,
        height: toolbarHeight,
    },
    titleContainer: {
        position: "absolute",
        width: STYLES.WIDTH,
        zIndex: 3,
        elevation: 3,
    },
    title: {
        fontSize: STYLES.FONTS.SUBTITLE,
        textAlign: "center",
        fontWeight: STYLES.BOLD,
    },
    backButton: {
        position: "absolute",
        zIndex: 4,
        top: backButtonTop,
        left: 4,
        elevation: 4,
    },
    externalLink: {
        position: "absolute",
        zIndex: 4,
        top: externalLinkTop,
        right: 12,
        elevation: 4,
    },
})

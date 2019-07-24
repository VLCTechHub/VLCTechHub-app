import React, { Component } from "react"
import { ActivityIndicator, Animated, Image, View } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton, BaseButton } from "react-native-gesture-handler"
import { Item, ItemData } from "./Item"
import { Meta, Subtitle, Tags, Tag } from "./Content"
import { iOSColors } from "react-native-typography"
import { MaterialIcons } from "@expo/vector-icons"

import { dateFormatted } from "../services/date"

import STYLES from "../constants/styles"

export default class Event extends Component {
    opacity = new Animated.Value(1)
    updateRef = ref => {
        this._swipeableRow = ref
    }
    close = () => {
        this._swipeableRow.close()
    }
    renderLeftActions = () => (
        <RectButton
            style={{
                backgroundColor: iOSColors.red,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: STYLES.SPACING.MAJOR,
            }}
            onPress={() => {
                this.close()
                Animated.timing(this.opacity, {
                    toValue: 0,
                }).start(() => this.props.disableEvent(this.props.event.id))
            }}
        >
            <Meta style={{ color: STYLES.COLORS.WHITE }}>Quitar</Meta>
        </RectButton>
    )
    renderRightActions = () => (
        <RectButton
            style={{
                backgroundColor: this.props.hasReminder ? iOSColors.orange : iOSColors.green,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: STYLES.SPACING.MAJOR,
            }}
            onPress={() => {
                this.close()
                this.props.setReminder(this.props.event.id)
            }}
        >
            <Meta style={{ color: STYLES.COLORS.WHITE }}>{this.props.hasReminder && "No "}Recordar</Meta>
        </RectButton>
    )
    render() {
        const date = dateFormatted(this.props.event.date)
        return (
            <Animated.View style={{ opacity: this.opacity }}>
                <Swipeable
                    renderLeftActions={this.renderLeftActions}
                    renderRightActions={this.renderRightActions}
                    ref={this.updateRef}
                >
                    <BaseButton onPress={this.props.handleClick}>
                        <Item white={this.props.index % 2 === 0}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 24 }}
                                source={{
                                    uri: `https://res.cloudinary.com/vlctechhub/image/twitter_name/w_240/${this.props.event.hashtag.slice(
                                        1,
                                    )}.jpg`,
                                }}
                                defaultSource={{
                                    uri:
                                        "https://dummyimage.com/256x256/000/fff.gif&text=%23",
                                }}
                            />
                            <ItemData>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Meta style={{ marginBottom: STYLES.SPACING.TINY }}>{date}</Meta>
                                    {this.props.isReminderLoading && (
                                        <ActivityIndicator
                                            style={{
                                                transform: [
                                                    { scale: 0.66 },
                                                    { translateX: 2 },
                                                    { translateY: -1 },
                                                ],
                                            }}
                                        />
                                    )}
                                    {this.props.hasReminder && !this.props.isReminderLoading && (
                                        <MaterialIcons
                                            size={16}
                                            name={"alarm-on"}
                                            color={STYLES.COLORS.PRIMARY_DARK}
                                        />
                                    )}
                                </View>
                                <Subtitle ellipsizeMode="tail" numberOfLines={1}>
                                    {this.props.event.title}
                                </Subtitle>
                                <Tags style={{ marginTop: STYLES.SPACING.TINY }}>
                                    {this.props.event.hashtag ? (
                                        <Tag last>{this.props.event.hashtag}</Tag>
                                    ) : null}
                                </Tags>
                            </ItemData>
                        </Item>
                    </BaseButton>
                </Swipeable>
            </Animated.View>
        )
    }
}

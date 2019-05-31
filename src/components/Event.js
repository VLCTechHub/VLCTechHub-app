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
                                        "data:image/gif;base64,R0lGODdhAAEAAbMAAAAAAP///5+fn9/f3z8/Px8fH7+/v39/f19fXwAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAEAAQAE/hDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJSgIDzc4DBCwFz84GyigDAdrbAQUsBNzb1tclBeHbLQfnAQfkJeDn4ysC6wjuJOrnAi3Z59H3Iuids8diXQCAIwys+6fC3LkBCEUY9LYCwbp9ET84DAeRRb5w/u0yerAYr4XCgSI9fOQWckW/cBRTbhAYjuAKgzI7vOTGMAU8jjk54GRBMhzGoBh+cus4b11LpBaKcjuq4mS4nlAprNz2NMXObTGzUrDKzWaKjeHEXviqLSwKpeLUVkDLLd1FuRTgapOngmZZvBOkbqOaguw2rGr9cm0xEbAEw9oQm6CrjSngxhXX8ZVLOYDlFFu1dVWrN8BmFIq1mZUbOgBhbAsdA0gdYDWKoY7ZBpD8bt1nubhVCNb22tiB48iTK19Om93y59CfQzYdvbptWQaza9/Ovbt37cVjfR9Pvrx54rjOq1/P3nX69vDjbw8PS779+4Pf49/fnv4rAQAG/ijggANONwCBCCaYoG4KNgjgdcW0BmEJuskGwHS8kdDZaWpV+M1dsvnWwnDsyFaafyPQliFSJI52wnRuJVYPY+tYCKM0mlno4QonyrahXSg51iMLKsrWmosm6BajWEUW9JCN6yxZTo4h1kiUUz5SuYKEspGIoggYGjkjCzsCFuYKnf3WYZQfllQlUFeegyRUpXFoAm0TsoglCzc6hieN50DpD45PylamTyACliaQIJmoZV+xOXYkP2z6OeZNVuZWqQp1WhhcCl5mWeiWewIWKp+RAjYpmZvidWZDIhra6luP4vUpCqcC1imRl+KVa1Wp4vWnk4HK9upZsTqGGae1/qq1qEelJkPNtNQ+Y1C12GbbTHbaVmtnffyFq963r4hrbnnkunLuut6l2wq78GrnLivx1uumLfbmuxcuBPTr778AAzzdAQEXbLDBBh2ssL/k6LaiCKWpKdatJ/zKWbIqrGpqsy/2ylq0Xs2q1nR5itDZQbKeIyUJuyqbqXCJ4hVxC8NurI9JwcpF25wkLOtqzic867LKcYYzb0pCZwwyaRzf6bFarX0ZgpKy1awCxWI53CacQ6dV9FSicq20nF02XcKxH5PNKtGOkUxosZqyzey9eJ3MKNhCmk2C1XJZjALaMqqNKdxmAj0ZxraKbAKJR4uUNGhLi9UypEGqGnmSXYpnxfdtL1vo+eeghy766KSXbvrpqKeu+uqst+7667DHLvvstNdu++2456777rz37vvvwAcv/PDEF2/88cgnr/zyzDfv/PPQRy/99NRXb/312Gev/fbcd+/996dHAAA7",
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

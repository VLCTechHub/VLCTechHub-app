import React from "react"
import { ActivityIndicator } from "react-native"
import { connect } from "react-redux"
import {
    SafeAreaView,
    Animated,
    Linking,
    StyleSheet,
    ScrollView,
    Image,
    View,
    TouchableHighlight,
} from "react-native"
import { DetailView, Title, Subtitle, Description } from "../../components/Content"
import Button from "../../components/Button"
import Divider from "../../components/Divider"
import { Feather } from "@expo/vector-icons"

import { setReminder } from "../../actions/reminders"

import STYLES from "../../constants/styles"

import { dateFormatted } from "../../services/date"

const headerRatio = 16 / 9
const headerHeight = STYLES.WIDTH / headerRatio

class EventDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: STYLES.COLORS.PRIMARY_LIGHT,
            },
            headerTintColor: STYLES.COLORS.PRIMARY_DARK,
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerRight: (
                <TouchableHighlight
                    onPress={() => Linking.openURL(navigation.getParam("event").link)}
                    underlayColor="transparent"
                >
                    <Feather
                        style={{ color: STYLES.COLORS.PRIMARY_DARK, marginRight: 12 }}
                        name="external-link"
                        size={24}
                    />
                </TouchableHighlight>
            ),
            title: navigation.getParam("event").hashtag,
        }
    }

    scrollY = new Animated.Value(0)

    buttonPressHandler(event) {
        Linking.openURL(event.link)
    }

    render() {
        const event = this.props.navigation.getParam("event")
        const date = dateFormatted(event.date)
        const isReminderLoading = this.props.remindersLoading.includes(event.id)
        const hasReminder = this.props.reminders.includes(event.id)
        return (
            <SafeAreaView style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    <DetailView>
                        {/* <Image
							style={styles.image}
							source={{
								uri: `https://res.cloudinary.com/vlctechhub/image/twitter_name/w_240/${event.hashtag.slice(
									1,
								)}.jpg`,
							}}
						/> */}

                        <Title>{event.title}</Title>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 30,
                            }}
                        >
                            <Subtitle>{date}</Subtitle>
                            <Button
                                disabled={hasReminder}
                                small
                                onPress={() => this.props.dispatchSetReminder(event.id)}
                                component={
                                    isReminderLoading && (
                                        <ActivityIndicator style={{ transform: [{ scale: 0.66 }] }} />
                                    )
                                }
                            >
                                {hasReminder ? "No recordar" : "Recordar"}
                            </Button>
                        </View>

                        <Divider />

                        <Description>{event.description}</Description>
                        {event.link ? (
                            <Button onPress={() => this.buttonPressHandler(event)}>Más información</Button>
                        ) : null}
                    </DetailView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: STYLES.COLORS.WHITE,
    },
    scrollViewContent: {
        // paddingTop: headerHeight,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: STYLES.SPACING.MAJOR,
        marginTop: STYLES.SPACING.MINOR,
    },
})

function mapStateToProps(state) {
    return {
        reminders: state.reminders.reminders,
        remindersLoading: state.reminders.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSetReminder: eventId => dispatch(setReminder(eventId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventDetailScreen)

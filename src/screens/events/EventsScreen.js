import React from "react"
import { connect } from "react-redux"
import { ScrollView, ActivityIndicator } from "react-native"
import { getDisabled, getEvents } from "../../selectors"

import CenteredView from "../../components/CenteredView"
import Event from "../../components/Event"
import STYLES from "../../constants/styles"

import { loadEvents, loadDisabledEvents, disableEvent } from "../../actions/events"
import { updatePushNotificationStatus } from "../../actions/notifications"
import { setReminder, loadReminders } from "../../actions/reminders"

class EventsScreen extends React.Component {
    componentDidMount() {
        this.props.dispatchLoadEvents()
        this.props.dispatchLoadDisabledEvents()
        this.props.dispatchLoadReminders()
    }

    componentDidUpdate({ notifications }) {
        const { permissionsLoaded, permissions } = this.props.notifications
        if (notifications.permissions.includes("events")) {
            return
        }
        if (permissionsLoaded && permissions.includes("events")) {
            this.props.dispatchUpdatePushNotificationStatus("events")
        }
    }

    eventSelectedHandler(event) {
        this.props.navigation.navigate("EventDetail", { event })
    }

    render() {
        if (!this.props.events || !this.props.disabled) {
            return (
                <CenteredView>
                    <ActivityIndicator />
                </CenteredView>
            )
        }
        return (
            <ScrollView style={{ backgroundColor: STYLES.COLORS.WHITE }}>
                {this.props.events
                    .filter(e => !this.props.disabled.includes(e.id))
                    .map((event, index) => (
                        <Event
                            key={event.id}
                            event={event}
                            index={index}
                            hasReminder={this.props.reminders.includes(event.id)}
                            handleClick={() => this.eventSelectedHandler(event)}
                            disableEvent={id => this.props.dispatchDisableEvent(id)}
                            setReminder={id => this.props.dispatchSetReminder(id)}
                        />
                    ))}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        disabled: getDisabled(state.events),
        events: getEvents(state.events),
        notifications: state.notifications,
        reminders: state.reminders.reminders,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDisableEvent: eventId => dispatch(disableEvent(eventId)),
        dispatchSetReminder: eventId => dispatch(setReminder(eventId)),
        dispatchLoadEvents: () => dispatch(loadEvents()),
        dispatchLoadDisabledEvents: () => dispatch(loadDisabledEvents()),
        dispatchLoadReminders: () => dispatch(loadReminders()),
        dispatchUpdatePushNotificationStatus: type => dispatch(updatePushNotificationStatus(type)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventsScreen)

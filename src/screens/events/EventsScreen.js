import React from "react"
import { connect } from "react-redux"
import { ScrollView, ActivityIndicator } from "react-native"
import { getDisabled, getEvents } from "../../selectors"

import CenteredView from "../../components/CenteredView"
import EmptyState from "../../components/EmptyState"
import Event from "../../components/Event"
import STYLES from "../../constants/styles"

import { loadEvents, loadDisabledEvents, disableEvent } from "../../actions/events"
import { updatePushNotificationStatus, resetIncomingNotification } from "../../actions/notifications"
import { setReminder, loadReminders } from "../../actions/reminders"

class EventsScreen extends React.Component {
    componentDidMount() {
        this.props.dispatchLoadEvents()
        this.props.dispatchLoadDisabledEvents()
        this.props.dispatchLoadReminders()
    }

    componentDidUpdate({ notifications }) {
        const { permissionsLoaded, permissions, incomingNotification } = this.props.notifications
        if (incomingNotification && incomingNotification.type === "jobs") {
            this.props.navigation.navigate("Jobs")
        }
        if (incomingNotification && ["events", "reminders"].includes(incomingNotification.type)) {
            const event = this.props.events.filter(e => e.id === incomingNotification.id)[0]
            if (event) {
                this.props.navigation.navigate("EventDetail", { event })
                this.props.dispatchResetIncomingNotification()
            }
            return
        }
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
                    <ActivityIndicator color={STYLES.COLORS.GREY} />
                </CenteredView>
            )
        }
        const events = this.props.events.filter(e => !this.props.disabled.includes(e.id))
        if (events.length === 0) {
            return <EmptyState>¡Que pena! Actualmente, no hay ningún evento en VLCTechHub.</EmptyState>
        }

        return (
            <ScrollView style={{ backgroundColor: STYLES.COLORS.WHITE }}>
                {events.map((event, index) => (
                    <Event
                        key={event.id}
                        event={event}
                        index={index}
                        hasReminder={this.props.reminders.includes(event.id)}
                        isReminderLoading={this.props.remindersLoading.includes(event.id)}
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
        remindersLoading: state.reminders.loading,
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
        dispatchResetIncomingNotification: () => dispatch(resetIncomingNotification()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventsScreen)

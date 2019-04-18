import React from "react"
import { connect } from "react-redux"
import { ScrollView, ActivityIndicator } from "react-native"
import { getDisabled, getEvents } from "../../selectors"

import CenteredView from "../../components/CenteredView"
import Event from "../../components/Event"
import STYLES from "../../constants/styles"

import { loadEvents, loadDisabledEvents, disableEvent } from "../../actions/events"
import { updatePushNotificationStatus } from "../../actions/notifications"

class EventsScreen extends React.Component {
    componentDidMount() {
        this.props.dispatchLoadEvents()
        this.props.dispatchLoadDisabledEvents()
    }

    componentDidUpdate() {
        const { permissionsLoaded, permissions } = this.props.notifications
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
                            handleClick={() => this.eventSelectedHandler(event)}
                            disableEvent={id => this.props.dispatchDisableEvent(id)}
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDisableEvent: eventId => dispatch(disableEvent(eventId)),
        dispatchLoadEvents: () => dispatch(loadEvents()),
        dispatchLoadDisabledEvents: () => dispatch(loadDisabledEvents()),
        dispatchUpdatePushNotificationStatus: type => dispatch(updatePushNotificationStatus(type)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventsScreen)

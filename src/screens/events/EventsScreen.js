import React from "react"
import { connect } from "react-redux"
import { ScrollView, ActivityIndicator } from "react-native"
import { getEvents } from "../../selectors"

import CenteredView from "../../components/CenteredView"
import Event from "../../components/Event"
import STYLES from "../../constants/styles"

import { loadEvents } from "../../actions/events"
import { updatePushNotificationStatus } from "../../actions/notifications"

class EventsScreen extends React.Component {
	componentDidMount() {
		this.props.dispatchLoadEvents()
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
		if (!this.props.events) {
			return (
				<CenteredView>
					<ActivityIndicator />
				</CenteredView>
			)
		}
		return (
			<ScrollView style={{ backgroundColor: STYLES.COLORS.WHITE }}>
				{this.props.events.map((event, index) => (
					<Event
						key={event.id}
						event={event}
						index={index}
						handleClick={() => this.eventSelectedHandler(event)}
					/>
				))}
			</ScrollView>
		)
	}
}

function mapStateToProps(state) {
	return {
		events: getEvents(state.events),
		notifications: state.notifications,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchLoadEvents: () => dispatch(loadEvents()),
		dispatchUpdatePushNotificationStatus: type => dispatch(updatePushNotificationStatus(type)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventsScreen)

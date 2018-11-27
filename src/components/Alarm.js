import React from "react"
import { connect } from "react-redux"
import { TouchableHighlight, StyleSheet, ActivityIndicator } from "react-native"
import { Permissions } from "expo"
import { MaterialIcons } from "@expo/vector-icons"

import STYLES from "../constants/styles"

import { registerForPushNotifications } from "../actions/notifications"

class Alarm extends React.Component {
	async getPushNotificationsPermissions() {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
		let finalStatus = existingStatus

		if (existingStatus !== "granted") {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
			finalStatus = status
		}
		if (finalStatus !== "granted") {
			return
		}

		this.props.dispatchRegisterForPushNotifications(this.props.type)
	}

	render() {
		if (!this.props.notifications || !this.props.notifications.permissionsLoaded) {
			return null
		}
		if (this.props.notifications.loading) {
			return <ActivityIndicator style={{ marginRight: 14 }} />
		}
		const isGranted = this.props.notifications.permissions.includes(this.props.type)
		return (
			<TouchableHighlight
				onPress={() =>
					isGranted
						? this.props.dispatchRegisterForPushNotifications(this.props.type, true)
						: this.getPushNotificationsPermissions()
				}
				style={styles.alarmContainer}
			>
				<MaterialIcons
					size={24}
					style={styles.alarm}
					name={isGranted ? "alarm-on" : "alarm-off"}
					color={STYLES.COLORS.PRIMARY_DARK}
				/>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	alarmContainer: {
		marginRight: 12,
	},
	alarm: {},
})

function mapStateToProps(state) {
	return {
		notifications: state.notifications,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchRegisterForPushNotifications: (type, unregister = false) =>
			dispatch(registerForPushNotifications(type, unregister)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Alarm)

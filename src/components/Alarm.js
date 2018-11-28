import React from "react"
import { connect } from "react-redux"
import { Alert, TouchableHighlight, StyleSheet, ActivityIndicator } from "react-native"
import { Permissions } from "expo"
import { MaterialIcons } from "@expo/vector-icons"

import STYLES from "../constants/styles"

import { registerForPushNotifications } from "../actions/notifications"

class Alarm extends React.Component {
	openPushNotificationsAlert = (type, disable) => {
		console.log(type)
		const title = `${disable ? "Desactivar" : "Activar"} notificaciones`
		const message = disable
			? `Quieres desactivar las notificaciones push para ${
					type === "events" ? "nuevos eventos" : "nuevas ofertas de trabajo"
			  }`
			: `Quieres activar notificaciones push cuando se publica ${
					type === "events" ? "un nuevo evento" : "una nueva oferta de trabajo"
			  }?`

		const onPress = () =>
			disable
				? this.props.dispatchRegisterForPushNotifications(type, true)
				: this.getPushNotificationsPermissions()

		Alert.alert(title, message, [
			{ text: disable ? "Desactivar" : "Activar", onPress },
			{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
		])
	}

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
						? this.openPushNotificationsAlert(this.props.type, true)
						: this.openPushNotificationsAlert(this.props.type)
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

import { Permissions, Notifications } from "expo"
import { PUSH_ENDPOINT } from "../constants/api"

export default async function registerForPushNotificationsAsync(type) {
	const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
	let finalStatus = existingStatus

	if (existingStatus !== "granted") {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
		finalStatus = status
	}

	if (finalStatus !== "granted") {
		return
	}

	let token = await Notifications.getExpoPushTokenAsync()
	// POST the token to your backend server from where you can retrieve it to send push notifications.
	return fetch(`${PUSH_ENDPOINT}/user/${type}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			token,
		}),
	})
		.then(val => console.log(val))
		.catch(err => console.log(err))
}

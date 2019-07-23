import * as types from "./types"
import { AsyncStorage, Alert } from "react-native"
import { Notifications, Permissions } from "expo"
import { PUSH_ENDPOINT } from "../constants/api"
import { LOCAL_REMINDERS_KEY } from "../constants/asyncStorage"

export function toggleReminder(eventId) {
    return async function(dispatch) {
        const remindersJSON = await AsyncStorage.getItem(LOCAL_REMINDERS_KEY)
        let reminders = JSON.parse(remindersJSON) || []
        if (reminders.includes(eventId)) {
            reminders = reminders.filter(id => id !== eventId)
        } else if (!reminders.includes(eventId)) {
            reminders.push(eventId)
        }
        await AsyncStorage.setItem(LOCAL_REMINDERS_KEY, JSON.stringify(reminders))
        dispatch(loadRemindersCompleted(reminders))
        dispatch(toggleReminderLoading(eventId))
    }
}

export function loadReminders() {
    return async function(dispatch) {
        const remindersJSON = await AsyncStorage.getItem(LOCAL_REMINDERS_KEY)
        const reminders = remindersJSON === null ? [] : JSON.parse(remindersJSON)
        dispatch(loadRemindersCompleted(reminders))
    }
}

export function loadRemindersCompleted(reminders) {
    return {
        type: types.LOCAL_REMINDERS_LOADED,
        payload: reminders,
    }
}

export function setReminder(eventId, unregister = false) {
    return async function(dispatch) {
        dispatch(toggleReminderLoading(eventId))

        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = existingStatus

        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }
        if (finalStatus !== "granted") {
            dispatch(toggleReminderLoading(eventId))
            return
        }

        const token = await Notifications.getExpoPushTokenAsync()
        console.log(token)

        fetch(`${PUSH_ENDPOINT}/user/reminders`, {
            method: unregister ? "DELETE" : "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                eventId,
            }),
        })
            .then(val => {
                console.log("reminder saved")
                dispatch(toggleReminder(eventId))
            })
            .catch(err => {
                console.log("error saving reminder", err)
                dispatch(loadReminders())
                dispatch(toggleReminderLoading(eventId))
            })
    }
}

export function toggleReminderLoading(reminderId) {
    return {
        type: types.LOCAL_REMINDERS_LOADING,
        payload: reminderId,
    }
}

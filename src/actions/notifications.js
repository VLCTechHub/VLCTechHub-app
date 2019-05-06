import * as types from "./types"
import { AsyncStorage } from "react-native"
import { Notifications } from "expo"
import { PUSH_ENDPOINT } from "../constants/api"
import { LOCAL_PERMISSIONS_KEY } from "../constants/asyncStorage"

export function toggleLocalPermissionsStatus(type) {
    return async function(dispatch) {
        const permissionsJSON = await AsyncStorage.getItem(LOCAL_PERMISSIONS_KEY)
        let permissions = JSON.parse(permissionsJSON) || []
        if (permissions.includes(type)) {
            permissions = permissions.filter(p => p !== type)
        } else if (!permissions.includes(type)) {
            permissions.push(type)
        }
        await AsyncStorage.setItem(LOCAL_PERMISSIONS_KEY, JSON.stringify(permissions))
        dispatch(getLocalPermissionsStatusCompleted(permissions))
    }
}

export function getLocalPermissionsStatus() {
    return async function(dispatch) {
        const permissionsJSON = await AsyncStorage.getItem(LOCAL_PERMISSIONS_KEY)
        const permissions = permissionsJSON === null ? [] : JSON.parse(permissionsJSON)
        dispatch(getLocalPermissionsStatusCompleted(permissions))
    }
}

export function getLocalPermissionsStatusCompleted(permissions) {
    return {
        type: types.LOCAL_PERMISSIONS_LOADED,
        payload: permissions,
    }
}

export function registerForPushNotifications(type, unregister = false) {
    return async function(dispatch) {
        dispatch(registerForPushNotificationsLoading())

        const token = await Notifications.getExpoPushTokenAsync()

        fetch(`${PUSH_ENDPOINT}/user/${type}`, {
            method: unregister ? "DELETE" : "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        })
            .then(val => {
                dispatch(toggleLocalPermissionsStatus(type))
                dispatch(registerForPushNotificationsSuccess())
            })
            .catch(err => dispatch(registerForPushNotificationsSuccess()))
    }
}

export function registerForPushNotificationsLoading() {
    return {
        type: types.PUSH_NOTIFICATIONS_REGISTER_LOADING,
    }
}

export function registerForPushNotificationsSuccess() {
    return {
        type: types.PUSH_NOTIFICATIONS_REGISTER_LOADED,
    }
}

export function updatePushNotificationStatus(type) {
    return async function() {
        const token = await Notifications.getExpoPushTokenAsync()
        fetch(`${PUSH_ENDPOINT}/user/${type}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        })
            .then(val => {})
            .catch(err => {})
    }
}

export function broadcastIncomingNotification(data) {
    return {
        type: types.BROADCAST_INCOMING_NOTIFICATION,
        payload: data,
    }
}

export function resetIncomingNotification(data) {
    return {
        type: types.RESET_INCOMING_NOTIFICATION,
    }
}

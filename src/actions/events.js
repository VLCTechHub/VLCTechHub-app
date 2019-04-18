import { AsyncStorage } from "react-native"
import * as types from "./types"
import fetchService from "../services/fetch"
import { LOCAL_DISABLED_EVENTS_KEY } from "../constants/asyncStorage"

export function disableEvent(eventId) {
    return async function(dispatch) {
        const disabledEventsJSON = await AsyncStorage.getItem(LOCAL_DISABLED_EVENTS_KEY)
        let disabledEvents = JSON.parse(disabledEventsJSON) || []
        if (!disabledEvents.includes(eventId)) {
            disabledEvents.push(eventId)
        }
        await AsyncStorage.setItem(LOCAL_DISABLED_EVENTS_KEY, JSON.stringify(disabledEvents))
        dispatch(disableEventCompleted(eventId))
    }
}

export function disableEventCompleted(eventId) {
    return {
        type: types.DISABLE_EVENT,
        payload: eventId,
    }
}

export function loadEvents() {
    return function(dispatch) {
        fetchService("events?category=next").then(eventsJson => {
            return dispatch(loadEventsCompleted(eventsJson))
        })
    }
}

export function loadDisabledEvents() {
    return async function(dispatch) {
        const disabledEventsJSON = await AsyncStorage.getItem(LOCAL_DISABLED_EVENTS_KEY)
        return dispatch(loadDisabledEventsCompleted(JSON.parse(disabledEventsJSON) || []))
    }
}

export function loadEventsCompleted(eventsJson) {
    return {
        type: types.EVENTS_LOADED,
        payload: eventsJson,
    }
}

export function loadDisabledEventsCompleted(disabledEvents) {
    return {
        type: types.DISABLED_EVENTS_LOADED,
        payload: disabledEvents,
    }
}

import { AsyncStorage } from "react-native"
import * as types from "./types"
import fetchService from "../services/fetch"

export function loadEvents() {
	return function(dispatch) {
		fetchService("events?category=next").then(eventsJson => {
			return dispatch(loadEventsCompleted(eventsJson))
		})
	}
}

// export function loadEvents() {
//   return {
//       type: types.EVENTS_LOADING,
//   }
// }

export function loadEventsCompleted(eventsJson) {
	return {
		type: types.EVENTS_LOADED,
		payload: eventsJson,
	}
}

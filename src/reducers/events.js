import { createSelector } from "reselect"

import { EVENTS_LOADING, EVENTS_LOADED } from "../actions/types"

export default function userReducer(state = {}, action) {
	switch (action.type) {
		//   case EVENTS_LOADING:
		//     return Object.assign({}, state, {
		//       loading: true,
		//     });
		case EVENTS_LOADED:
			return Object.assign({}, state, {
				data: action.payload,
			})
		default:
			return state
	}
}

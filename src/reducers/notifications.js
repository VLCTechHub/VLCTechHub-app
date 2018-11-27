import {
	LOCAL_PERMISSIONS_LOADED,
	PUSH_NOTIFICATIONS_REGISTER_LOADING,
	PUSH_NOTIFICATIONS_REGISTER_LOADED,
} from "../actions/types"

export default function notificationsReducer(
	state = { permissions: [], permissionsLoaded: false, loading: false, loaded: false },
	action,
) {
	switch (action.type) {
		case LOCAL_PERMISSIONS_LOADED:
			return Object.assign({}, state, {
				permissionsLoaded: true,
				permissions: action.payload,
			})
		case PUSH_NOTIFICATIONS_REGISTER_LOADING:
			return Object.assign({}, state, {
				loading: true,
			})
		case PUSH_NOTIFICATIONS_REGISTER_LOADED:
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
			})
		default:
			return state
	}
}

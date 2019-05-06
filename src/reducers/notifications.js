import {
    LOCAL_PERMISSIONS_LOADED,
    PUSH_NOTIFICATIONS_REGISTER_LOADING,
    PUSH_NOTIFICATIONS_REGISTER_LOADED,
    BROADCAST_INCOMING_NOTIFICATION,
    RESET_INCOMING_NOTIFICATION,
} from "../actions/types"

export default function notificationsReducer(
    state = {
        permissions: [],
        permissionsLoaded: false,
        loading: false,
        loaded: false,
        incomingNotification: null,
    },
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
        case BROADCAST_INCOMING_NOTIFICATION:
            return Object.assign({}, state, {
                incomingNotification: action.payload,
            })
        case RESET_INCOMING_NOTIFICATION:
            return Object.assign({}, state, {
                incomingNotification: null,
            })
        default:
            return state
    }
}

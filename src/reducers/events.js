import { createSelector } from "reselect"

import { EVENTS_LOADED, DISABLED_EVENTS_LOADED, DISABLE_EVENT } from "../actions/types"

export default function eventsReducer(state = {}, action) {
    switch (action.type) {
        case DISABLE_EVENT:
            return Object.assign({}, state, {
                disabled: [action.payload].concat(state.disabled || []),
            })
        case EVENTS_LOADED:
            return Object.assign({}, state, {
                data: action.payload,
            })
        case DISABLED_EVENTS_LOADED:
            return Object.assign({}, state, {
                disabled: action.payload,
            })
        default:
            return state
    }
}

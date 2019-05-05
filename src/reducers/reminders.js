import { LOCAL_REMINDERS_LOADED } from "../actions/types"

export default function remindersReducer(state = { reminders: [] }, action) {
    switch (action.type) {
        case LOCAL_REMINDERS_LOADED:
            return Object.assign({}, state, {
                reminders: action.payload,
            })
        default:
            return state
    }
}

import { LOCAL_REMINDERS_LOADED, LOCAL_REMINDERS_LOADING } from "../actions/types"

export default function remindersReducer(state = { reminders: [], loading: [] }, action) {
    switch (action.type) {
        case LOCAL_REMINDERS_LOADED:
            return Object.assign({}, state, {
                reminders: action.payload,
            })
        case LOCAL_REMINDERS_LOADING:
            const loading = state.loading.includes(action.payload)
                ? state.loading.filter(item => item !== action.payload)
                : state.loading.concat([action.payload])
            console.log(loading)
            return Object.assign({}, state, {
                loading,
            })
        default:
            return state
    }
}

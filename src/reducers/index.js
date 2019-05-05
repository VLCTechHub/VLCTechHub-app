import { combineReducers } from "redux"
import events from "./events"
import jobs from "./jobs"
import notifications from "./notifications"
import reminders from "./reminders"

export default combineReducers({
    events,
    jobs,
    notifications,
    reminders,
})

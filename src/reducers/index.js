import { combineReducers } from "redux"
import events from "./events"
import jobs from "./jobs"
import notifications from "./notifications"

export default combineReducers({
	events,
	jobs,
	notifications,
})

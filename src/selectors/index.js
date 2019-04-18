const getDisabled = state => state && state.disabled
const getEvents = state => state && state.data && state.data.events
const getJobs = state => state && state.data && state.data.jobs

export { getDisabled, getEvents, getJobs }

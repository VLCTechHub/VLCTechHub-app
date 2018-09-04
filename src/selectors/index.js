const getEvents = state => state && state.data && state.data.events;
const getJobs = state => state && state.data && state.data.jobs;

export { getEvents, getJobs };

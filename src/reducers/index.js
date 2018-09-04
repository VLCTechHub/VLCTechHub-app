import { combineReducers } from 'redux';
import events from './events';
import jobs from './jobs';

export default combineReducers({
  events,
  jobs,
});

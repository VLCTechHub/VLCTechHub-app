import { JOBS_LOADING, JOBS_LOADED } from "../actions/types";

export default function jobsReducer(state = { loaded: false }, action) {
  switch (action.type) {
    //   case JOBS_LOADING:
    //     return Object.assign({}, state, {
    //       loading: true,
    //     });
    case JOBS_LOADED:
      return Object.assign({}, state, {
        data: action.payload,
        loading: false,
        loaded: true
      });
    default:
      return state;
  }
}

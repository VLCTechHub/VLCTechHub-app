import { AsyncStorage } from "react-native";
import * as types from "./types";
import fetchService from "../services/fetch";

export function loadJobs(user) {
  return function(dispatch) {
    fetchService("/jobs").then(jobsJson => {
      return dispatch(loadJobsCompleted(jobsJson));
    });
  };
}

// export function loadJobs() {
//   return {
//       type: types.JOBS_LOADING,
//   }
// }

export function loadJobsCompleted(jobsJson) {
  return {
    type: types.JOBS_LOADED,
    payload: jobsJson
  };
}

import React from "react";
import { connect } from "react-redux";
import { ScrollView, ActivityIndicator } from "react-native";
import { getJobs } from "../../selectors";

import CenteredView from "../../components/CenteredView";
import Job from "../../components/Job";
import STYLES from "../../constants/styles";

import { loadJobs } from "../../actions/jobs";

class JobsScreen extends React.Component {
  componentDidMount() {
    this.props.dispatchLoadJobs();
  }

  jobSelectedHandler(job) {
    this.props.navigation.navigate("JobDetail", { job });
  }

  render() {
    if (!this.props.jobs) {
      return (
        <CenteredView>
          <ActivityIndicator />
        </CenteredView>
      );
    }
    return (
      <ScrollView style={{ backgroundColor: STYLES.COLORS.WHITE }}>
        {this.props.jobs.map((job, index) => (
          <Job
            key={job.id}
            job={job}
            index={index}
            handleClick={() => this.jobSelectedHandler(job)}
          />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobs: getJobs(state.jobs)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadJobs: () => dispatch(loadJobs())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsScreen);

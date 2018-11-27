import React from "react"
import { connect } from "react-redux"
import { ScrollView, ActivityIndicator, Text } from "react-native"
import { getJobs } from "../../selectors"

import CenteredView from "../../components/CenteredView"
import Job from "../../components/Job"
import STYLES from "../../constants/styles"

import { Feather } from "@expo/vector-icons"

import { loadJobs } from "../../actions/jobs"

class JobsScreen extends React.Component {
	static navigationOptions = {
		headerRight: <Text>test</Text>,
	}
	componentDidMount() {
		this.props.dispatchLoadJobs()
	}

	jobSelectedHandler(job) {
		this.props.navigation.navigate("JobDetail", { job })
	}

	render() {
		console.log(this.props.jobs)
		if (!this.props.jobs) {
			return (
				<CenteredView>
					<ActivityIndicator />
				</CenteredView>
			)
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
		)
	}
}

function mapStateToProps(state) {
	return {
		jobs: getJobs(state.jobs),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchLoadJobs: () => dispatch(loadJobs()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(JobsScreen)

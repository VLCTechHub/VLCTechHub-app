import React from "react"
import { connect } from "react-redux"
import { ScrollView, ActivityIndicator, Text } from "react-native"
import { getJobs } from "../../selectors"

import CenteredView from "../../components/CenteredView"
import Job from "../../components/Job"
import EmptyState from "../../components/EmptyState"
import STYLES from "../../constants/styles"

import { loadJobs } from "../../actions/jobs"
import { updatePushNotificationStatus, resetIncomingNotification } from "../../actions/notifications"

class JobsScreen extends React.Component {
    static navigationOptions = {
        headerRight: <Text>test</Text>,
    }
    componentDidMount() {
        this.props.dispatchLoadJobs()
    }

    componentDidUpdate({ notifications }) {
        const { permissionsLoaded, permissions, incomingNotification } = this.props.notifications
        if (incomingNotification && incomingNotification.type === "jobs") {
            const job = this.props.jobs.filter(j => j.id === incomingNotification.id)[0]
            if (job) {
                this.props.navigation.navigate("JobDetail", { job })
                this.props.dispatchResetIncomingNotification()
            }
            return
        }
        if (notifications.permissions.includes("jobs")) {
            return
        }
        if (permissionsLoaded && permissions.includes("jobs")) {
            this.props.dispatchUpdatePushNotificationStatus("jobs")
        }
    }

    jobSelectedHandler(job) {
        this.props.navigation.navigate("JobDetail", { job })
    }

    render() {
        if (!this.props.jobs) {
            return (
                <CenteredView>
                    <ActivityIndicator />
                </CenteredView>
            )
        }

        const jobs = this.props.jobs
        if (jobs.length === 0) {
            return (
                <EmptyState>
                    ¡Que pena! Actualmente, no hay ningúna oferta de trabajo en VLCTechHub.
                </EmptyState>
            )
        }

        return (
            <ScrollView style={{ backgroundColor: STYLES.COLORS.WHITE }}>
                {jobs.map((job, index) => (
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
        notifications: state.notifications,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLoadJobs: () => dispatch(loadJobs()),
        dispatchUpdatePushNotificationStatus: type => dispatch(updatePushNotificationStatus(type)),
        dispatchResetIncomingNotification: () => dispatch(resetIncomingNotification()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(JobsScreen)

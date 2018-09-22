import React from "react";
import { connect } from "react-redux";
import { ScrollView, ActivityIndicator } from "react-native";
import { getEvents } from "../../selectors";

import CenteredView from "../../components/CenteredView";
import Event from "../../components/Event";

import { loadEvents } from "../../actions/events";

class EventsScreen extends React.Component {
  componentDidMount() {
    this.props.dispatchLoadEvents();
  }

  eventSelectedHandler(event) {
    this.props.navigation.navigate("EventDetail", { event });
  }

  render() {
    if (!this.props.events) {
      return (
        <CenteredView>
          <ActivityIndicator />
        </CenteredView>
      );
    }
    return (
      <ScrollView
        style={{ backgroundColor: "#FFF" }}
        onResponderMove={evt => console.log(evt.nativeEvent)}
      >
        {this.props.events.map(event => (
          <Event
            key={event.id}
            event={event}
            handleClick={() => this.eventSelectedHandler(event)}
          />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: getEvents(state.events)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadEvents: () => dispatch(loadEvents())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsScreen);

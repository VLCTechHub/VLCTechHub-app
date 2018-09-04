import React from "react";
import { connect } from "react-redux";
import { ScrollView, Button, Linking } from "react-native";
import { DetailView, Title, Description, Meta } from "../../components/Content";
import moment from "moment";

class EventDetailScreen extends React.Component {
  buttonPressHandler(event) {
    Linking.openURL(event.link);
  }

  render() {
    const event = this.props.navigation.getParam("event");
    const date = moment(event.date).format("dddd, MMMM Do YYYY, h:mm a");
    return (
      <ScrollView>
        <DetailView>
          <Title>{event.title}</Title>
          <Meta>{date}</Meta>
          <Description>{event.description}</Description>
          <Button
            title="Más información"
            onPress={() => this.buttonPressHandler(event)}
          />
        </DetailView>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailScreen);

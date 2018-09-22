import React from "react";
import { connect } from "react-redux";
import { ScrollView, TouchableHighlight, Text, Linking } from "react-native";
import { DetailView, Title, Description, Meta } from "../../components/Content";
import moment from "moment";

class EventDetailScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: "#000000",
    headerStyle: { backgroundColor: "#FDD951" }
  };

  buttonPressHandler(event) {
    Linking.openURL(event.link);
  }

  render() {
    const event = this.props.navigation.getParam("event");
    const date = moment(event.date).format("dddd, MMMM Do YYYY, h:mm a");
    return (
      <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
        <DetailView>
          <Title>{event.title}</Title>
          <Meta>{date}</Meta>
          <Description>{event.description}</Description>
          <TouchableHighlight
            style={{
              backgroundColor: "#FDD951",
              borderRadius: 16,
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16
            }}
            onPress={() => this.buttonPressHandler(event)}
          >
            <Text>Más información</Text>
          </TouchableHighlight>
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

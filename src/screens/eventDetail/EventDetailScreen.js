import React from "react";
import { connect } from "react-redux";
import { ScrollView, Linking } from "react-native";
import { DetailView, Title, Description, Meta } from "../../components/Content";
import Button from "../../components/Button";
import moment from "moment";

import STYLES from "../../constants/styles";

class EventDetailScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: STYLES.COLORS.BLACK,
    headerStyle: { backgroundColor: STYLES.COLORS.PRIMARY }
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
          <Button onPress={() => this.buttonPressHandler(event)}>
            Más información
          </Button>
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

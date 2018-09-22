import React from "react";
import { ScrollView, TouchableHighlight, Text, Linking } from "react-native";
import { DetailView, Title, Description } from "../../components/Content";
import { Meta } from "../../components/Content";

export default class JobDetailScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: "#000000",
    headerStyle: { backgroundColor: "#FDD951" }
  };
  buttonPressHandler(job) {
    Linking.openURL(job.link);
  }

  render() {
    const job = this.props.navigation.getParam("job");
    console.log(job);
    // const date = moment(job.date).format("dddd, MMMM Do YYYY, h:mm a");

    return (
      <ScrollView>
        <DetailView>
          <Title>{job.title}</Title>
          <Meta>{job.company.name}</Meta>
          <Description>{job.description}</Description>
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

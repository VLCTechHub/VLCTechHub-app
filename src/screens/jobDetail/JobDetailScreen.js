import React from "react";
import { ScrollView, Button, Linking } from "react-native";
import { DetailView, Title, Description } from "../../components/Content";
import { Meta } from "../../components/Content";

export default class JobDetailScreen extends React.Component {
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
          <Button
            title="Más información"
            onPress={() => this.buttonPressHandler(job)}
          />
        </DetailView>
      </ScrollView>
    );
  }
}

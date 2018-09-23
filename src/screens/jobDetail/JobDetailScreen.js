import React from "react";
import { ScrollView, TouchableHighlight, Text, Linking } from "react-native";
import {
  DetailView,
  Title,
  Description,
  Subtitle,
  Callout
} from "../../components/Content";
import Button from "../../components/Button";
import STYLES from "../../constants/styles";
export default class JobDetailScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: STYLES.COLORS.BLACK,
    headerStyle: { backgroundColor: STYLES.COLORS.PRIMARY }
  };
  buttonPressHandler(job) {
    Linking.openURL(job.link);
  }

  render() {
    const job = this.props.navigation.getParam("job");

    return (
      <ScrollView style={{ backgroundColor: STYLES.COLORS.WHITE }}>
        <DetailView>
          <Title>{job.title}</Title>
          <Subtitle>{job.company.name}</Subtitle>
          <Callout>{job.salary}</Callout>
          <Description>{job.description}</Description>
          <Button onPress={() => this.buttonPressHandler(job)}>
            Más información
          </Button>
        </DetailView>
      </ScrollView>
    );
  }
}

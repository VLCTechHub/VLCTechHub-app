import React from "react";
import { TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

import { Item, ItemData } from "./Item";
import { Meta, TitleSmall } from "./Content";

export default props => {
  const date = moment(props.event.date).format("dddd, MMMM Do YYYY, h:mm a");
  return (
    <TouchableHighlight onPress={props.handleClick}>
      <Item>
        <Feather name="calendar" size={25} />
        <ItemData>
          <Meta>{date}</Meta>
          <TitleSmall>{props.event.title}</TitleSmall>
        </ItemData>
      </Item>
    </TouchableHighlight>
  );
};

import React from "react";
import { TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

import { Item, ItemData } from "./Item";
import { Meta, Subtitle } from "./Content";

import STYLES from "../constants/styles";

export default props => {
  const date = moment(props.event.date).format("dddd, MMMM Do YYYY, h:mm a");
  return (
    <TouchableHighlight
      onPress={props.handleClick}
      underlayColor={STYLES.COLORS.GREY_LIGHTER}
    >
      <Item>
        <Feather
          name="calendar"
          size={25}
          style={{ color: STYLES.COLORS.GREY_LIGHT }}
        />
        <ItemData>
          <Meta>{date}</Meta>
          <Subtitle>{props.event.title}</Subtitle>
        </ItemData>
      </Item>
    </TouchableHighlight>
  );
};

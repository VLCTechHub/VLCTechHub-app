import React from "react";
import { TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

import { Item, ItemData } from "./Item";
import { Meta, Subtitle, Tags, Tag } from "./Content";

import STYLES from "../constants/styles";

export default props => {
  const date = moment(props.event.date).format("dddd, MMMM Do YYYY, h:mm a");
  console.log(props);
  return (
    <TouchableHighlight
      onPress={props.handleClick}
      underlayColor={STYLES.COLORS.GREY_LIGHTER}
    >
      <Item white={props.index % 2 === 0}>
        <Feather
          name="calendar"
          size={25}
          style={{ color: STYLES.COLORS.GREY_LIGHT }}
        />
        <ItemData>
          <Meta>{date}</Meta>
          <Subtitle ellipsizeMode="tail" numberOfLines={1}>{props.event.title}</Subtitle>
          <Tags>
            {props.event.hashtag &&
              <Tag last>{props.event.hashtag}</Tag>}
          </Tags>
        </ItemData>
      </Item>
    </TouchableHighlight>
  );
};

import styled from "styled-components/native";
import STYLES from "../constants/styles";

export const Item = styled.View`
  width: ${STYLES.WIDTH};
  border-bottom-width: 1;
  border-bottom-color: #999;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 12;
  padding-vertical: 6;
`;

export const ItemData = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: 12;
`;

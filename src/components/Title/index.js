import React from 'react';
import { TitleText } from "./titleStyled";

export default function Title(props) {
  const text = (props && props.children) || '';
  return <TitleText {...props}>{text}</TitleText>
}

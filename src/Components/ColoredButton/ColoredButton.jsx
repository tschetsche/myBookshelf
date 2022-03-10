import React from 'react';
import styled from 'styled-components';

const StyledColoredButton = styled.button`
  padding: 8px 12px;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 2px;
  background: #106972;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${(props) => props.theme.accentFontColor};
  }
`;

const ColoredButton = ({ title, ...props }) => {
  return <StyledColoredButton {...props}>{title}</StyledColoredButton>;
};

export default ColoredButton;

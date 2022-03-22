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
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  &:hover {
    background: ${(props) => props.theme.accentFontColor};
  }
`;

const ColoredButton = ({ title, fullWidth, ...props }) => {
  return (
    <StyledColoredButton {...props} fullWidth={fullWidth}>
      {title}
    </StyledColoredButton>
  );
};

export default ColoredButton;

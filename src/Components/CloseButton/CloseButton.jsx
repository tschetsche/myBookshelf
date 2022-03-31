import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

const StyledCloseButton = styled.button`
  outline: 0;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  background: 0;
  padding: 0;
  cursor: pointer;
  font-size: 20px;
`;

const CloseButton = ({ onClose }) => {
  return (
    <StyledCloseButton
      className={'close_btn'}
      onClick={() => {
        onClose(false);
      }}
    >
      <IoMdClose />
    </StyledCloseButton>
  );
};

export default CloseButton;

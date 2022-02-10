import React, { useState } from 'react';
import styled from 'styled-components';

export const ModalContext = React.createContext(false);

const StyledModalWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  align-content: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  z-index: 1000;
  padding: 10px 20px;
`;

const GlobalModalProvider = (props) => {
  const [modalContent, setModalContent] = useState();
  return (
    <React.Fragment>
      {!!modalContent && (
        <StyledModalWrapper>
          <div className={'modal'}>{modalContent}</div>
        </StyledModalWrapper>
      )}
      <ModalContext.Provider value={setModalContent}>{props.children}</ModalContext.Provider>
    </React.Fragment>
  );
};

export default GlobalModalProvider;

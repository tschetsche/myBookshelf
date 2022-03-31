import React, { useState } from 'react';
import styled from 'styled-components';

export const ModalContext = React.createContext(false);

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: rgb(0, 0, 0, 0.5);
  .modal_container {
    position: absolute;
    display: flex;
    align-content: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    padding: 10px 20px;
  }
`;

const GlobalModalProvider = (props) => {
  const [modalContent, setModalContent] = useState();
  return (
    <React.Fragment>
      {!!modalContent && (
        <StyledModalWrapper>
          <div className={'modal_container'}>{modalContent}</div>
        </StyledModalWrapper>
      )}
      <ModalContext.Provider value={setModalContent}>{props.children}</ModalContext.Provider>
    </React.Fragment>
  );
};

export default GlobalModalProvider;

import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import 'react-toastify/dist/ReactToastify.minimal.css';

const fadeIn = keyframes`
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
`;

const StyledToast = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  .fadeIn {
    animation: ${fadeIn} 1s ease-in;
  }

  .fadeOut {
    animation: ${fadeOut} 1s ease-in;
  }
`;

const Toast = () => {
  return (
    <StyledToast
      position='top-right'
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={'colored'}
    />
  );
};

export default Toast;

import React from 'react';
import styled from 'styled-components';
import login from '../../../assets/images/login.jpg';
import CloseButton from '../../CloseButton/CloseButton';

const StyledLoginForm = styled.div`
  display: flex;
  font-family: 'montserrat';

  .modal_left {
    padding: 60px 30px 20px;
    flex: 1.5;
  }

  .modal_right {
    flex: 2;
    overflow: hidden;

    img {
      width: 100%;
      height: 30em;
      transform: scale(1);
      object-fit: fill;
    }
  }

  .modal_title {
    font-size: 26px;
    font-weight: 700;
  }

  .modal_desc {
    font-size: 18px;
  }

  .register_block,
  .login_block {
    margin-top: 16px;
    font-size: 14px;
    button {
      background: none;
      border: none;
      padding: 0 8px;
      color: ${(props) => props.theme.accentFontColor};
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
      font-family: 'montserrat';
    }
  }
`;

const LoginForm = ({ children, onClose }) => {
  return (
    <StyledLoginForm>
      <div className={'modal_left'}>{children}</div>
      <div className={'modal_right'}>
        <img src={login} alt=''></img>
      </div>
      <CloseButton onClose={onClose} />
    </StyledLoginForm>
  );
};

export default LoginForm;

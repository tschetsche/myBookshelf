import React from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import login from '../../../assets/images/login.jpg';

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

  .close_btn {
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

  .submit_btn {
    padding: 8px 12px;
    outline: none;
    border: 0;
    color: #fff;
    border-radius: 2px;
    background: #106972;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.accentFontColor};
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
      <button
        className={'close_btn'}
        onClick={() => {
          onClose(false);
        }}
      >
        <AiOutlineCloseCircle />
      </button>
    </StyledLoginForm>
  );
};

export default LoginForm;

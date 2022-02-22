import React from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
      height: 100%;
      transform: scale(1);
    }
  }

  .login_btn {
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

  .modal_title {
    font-size: 26px;
    font-weight: 700;
  }

  .modal_desc {
    font-size: 18px;
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

  .input_block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: 0.3s;

    input {
      outline: 0;
      border: 0;
      padding: 4px 0 0;
      font-size: 14px;
      background-color: ${(props) => props.theme.toggleElementColor};

      &::placeholder {
        color: #ddd;
        opacity: 1;
      }
    }

    &:focus-within {
      border-color: ${(props) => props.theme.toggleElementColor};
    }
  }
  .register_block {
    margin-top: 16px;
    font-size: 14px;
    .register_btn {
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

const LoginForm = ({ email, handleEmailChange, password, handlePasswordChange, onSubmit, handleModeState, onClose }) => {
  return (
    <StyledLoginForm>
      <div className={'modal_left'}>
        <h5 className={'modal_title'}>Sign in</h5>
        <h6 className={'modal_desc'}>Welcome Back!</h6>
        <div className={'input_block'}>
          <input name='text' id='email' placeholder='Email' required='' type='email' value={email} onChange={handleEmailChange}></input>
        </div>
        <div className={'input_block'}>
          <input name='text' id='password' placeholder='Password' required='' type={password} onChange={handlePasswordChange}></input>
        </div>
        <button className={'login_btn'} onClick={onSubmit}>
          Login
        </button>
        <div className={'register_block'}>
          Don't have an account?
          <button className={'register_btn'} onClick={handleModeState}>
            Sign up now
          </button>
        </div>
      </div>
      <div className={'modal_right'}>
        <img
          src='https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80'
          alt=''
        ></img>
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

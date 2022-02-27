import React from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Formik, Form } from 'formik';
import FormikInput from '../../Formik/FormikInput';

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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const LoginForm = ({ email, handleEmailChange, password, handlePasswordChange, handleSubmit, handleModeState, onClose }) => {
  return (
    <StyledLoginForm>
      <div className={'modal_left'}>
        <Formik
          initialValues={{ email: email, password: password }}
          onSubmit={handleSubmit}
          validate={(formValues) => {
            console.log(formValues);
            const errorObj = {};
            let isValid = true;
            if (!validateEmail(email)) {
              isValid = false;
              errorObj.email = 'Email is not valid';
            }
            if (password.length < 6) {
              isValid = false;
              errorObj.password = 'Password should be at least 6 characters';
            }
            if (!isValid) return errorObj;
          }}
        >
          <Form>
            <h5 className={'modal_title'}>Sign in</h5>
            <h6 className={'modal_desc'}>Welcome Back!</h6>
            <FormikInput name='email' type='email' placeholder='Email' id='email' value={email} onChange={handleEmailChange}></FormikInput>
            <FormikInput
              name='password'
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
            ></FormikInput>
            <button type='submit' className={'login_btn'}>
              Login
            </button>
            <div className={'register_block'}>
              Don't have an account?
              <button className={'register_btn'} onClick={handleModeState}>
                Sign up now
              </button>
            </div>
          </Form>
        </Formik>
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

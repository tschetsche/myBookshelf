import React, { useState } from 'react';
import styled from 'styled-components';
import fakeApi from '../../../api/fakeApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../../store/actions/user';
import LoginForm from './LoginForm';
import { Formik, Form } from 'formik';
import FormikInput from '../../Formik/FormikInput';

const StyledLoginModal = styled.div`
  position: fixed;
  background: ${(props) => props.theme.toggleElementColor};
  max-width: 720px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    fakeApi.post('/login', { email, password }).then((response) => {
      dispatch(userLoggedIn({ userName: email, userRoles: ['regularUser'], isLoggedIn: response.data.accessToken }));
      onClose(false);
    });
  };

  const handleRegister = ({ email, password }) => {
    fakeApi.post('/register', { email, password }).then((response) => {
      dispatch(userLoggedIn({ userName: email, userRoles: ['regularUser'], isLoggedIn: response.data.accessToken }));
      onClose(false);
    });
  };

  const toggleModeState = () => {
    setIsLogin(!isLogin);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateForm = (values) => {
    const errorObj = {};
    let isValid = true;
    if (!validateEmail(values.email)) {
      isValid = false;
      errorObj.email = 'Email is not valid';
    }
    if (values.password.length < 6) {
      isValid = false;
      errorObj.password = 'Password should be at least 6 characters';
    }
    if (!isValid) return errorObj;
  };

  return (
    <StyledLoginModal>
      {isLogin ? (
        <LoginForm onClose={onClose}>
          <Formik
            initialValues={{ email: email, password: '' }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
            validate={(values) => validateForm(values)}
          >
            {({ values }) => (
              <Form>
                <h5 className={'modal_title'}>Sign in</h5>
                <h6 className={'modal_desc'}>Welcome Back!</h6>
                <FormikInput name='email' type='email' placeholder='Email' id='email'></FormikInput>
                <FormikInput name='password' type='password' placeholder='Password' id='password'></FormikInput>
                <button type='submit' className={'submit_btn'}>
                  Login
                </button>
                <div className={'register_block'}>
                  Don't have an account?
                  <button
                    type='button'
                    className={'register_btn'}
                    onClick={() => {
                      if (values.email !== '') {
                        setEmail(values.email);
                      }
                      toggleModeState();
                    }}
                  >
                    Sign up now
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </LoginForm>
      ) : (
        <LoginForm onClose={onClose}>
          <Formik
            initialValues={{ email: email, password: '' }}
            onSubmit={(values) => {
              handleRegister(values);
            }}
            validate={(values) => validateForm(values)}
          >
            {({ values }) => (
              <Form>
                <h5 className={'modal_title'}>Create account</h5>
                <h6 className={'modal_desc'}>Join us</h6>
                <FormikInput name='email' type='email' placeholder='Email' id='email'></FormikInput>
                <FormikInput name='password' type='password' placeholder='Password' id='password'></FormikInput>
                <button type='submit' className={'submit_btn'}>
                  Sign up
                </button>
                <div className={'login_block'}>
                  Already have an account?
                  <button
                    type='button'
                    className={'login_btn'}
                    onClick={() => {
                      if (values.email !== '') {
                        setEmail(values.email);
                      }
                      toggleModeState();
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </LoginForm>
      )}
    </StyledLoginModal>
  );
};

export default LoginModal;

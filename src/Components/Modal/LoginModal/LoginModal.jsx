import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn, userRegister } from '../../../store/actions/user';
import LoginForm from './LoginForm';
import { Formik, Form } from 'formik';
import FormikInput from '../../Formik/FormikInput';
import ColoredButton from '../../ColoredButton/ColoredButton';
import { toast } from 'react-toastify';
import { selectApiError } from '../../../store/selectors/globalApp';
import { useEffect } from 'react';

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
  const errorMessage = useSelector(selectApiError);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    console.log('within use Effect');
    if (errorMessage) {
      toast.error(errorMessage);
      setApiError(errorMessage);
    }
  }, [errorMessage]);

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
            onSubmit={({ email, password }) => {
              dispatch(userLogIn({ email, password })).then(() => {
                onClose(false);
              });
            }}
            validate={(values) => validateForm(values)}
          >
            {({ values }) => (
              <Form>
                <h5 className={'modal_title'}>Sign in</h5>
                <h6 className={'modal_desc'}>Welcome Back!</h6>
                <FormikInput name='email' type='email' placeholder='Email' id='email'></FormikInput>
                <FormikInput name='password' type='password' placeholder='Password' id='password'></FormikInput>
                <ColoredButton type={'submit'} className={'submit_btn'} title={'Login'} fullWidth={true}></ColoredButton>
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
            onSubmit={({ email, password }) => {
              dispatch(userRegister({ email, password })).then(() => {
                onClose(false);
              });
            }}
            validate={(values) => validateForm(values)}
          >
            {({ values }) => (
              <Form>
                <h5 className={'modal_title'}>Create account</h5>
                <h6 className={'modal_desc'}>Join us</h6>
                <FormikInput name='email' type='email' placeholder='Email' id='email'></FormikInput>
                <FormikInput name='password' type='password' placeholder='Password' id='password'></FormikInput>
                <ColoredButton type={'submit'} className={'submit_btn'} title={'Sign up'} fullWidth={true}></ColoredButton>
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

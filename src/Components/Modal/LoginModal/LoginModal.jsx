import React, { useState } from 'react';
import styled from 'styled-components';
import fakeApi from '../../../api/fakeApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../../store/actions/user';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    fakeApi.post('/login', { email, password }).then((response) => {
      dispatch(userLoggedIn({ userName: email, userRoles: ['regularUser'], isLoggedIn: response.data.accessToken }));
    });
  };

  const handleRegister = () => {
    fakeApi.post('/register', { email, password }).then((response) => {
      dispatch(userLoggedIn({ userName: email, userRoles: ['regularUser'], isLoggedIn: response.data.accessToken }));
    });
  };

  const toggleModeState = () => {
    setIsLogin(!isLogin);
  };

  return (
    <StyledLoginModal>
      {isLogin ? (
        <LoginForm
          email={email}
          handleEmailChange={handleEmailChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
          handleModeState={toggleModeState}
          onClose={onClose}
        />
      ) : (
        <RegisterForm
          email={email}
          handleEmailChange={handleEmailChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          onSubmit={handleRegister}
          handleModeState={toggleModeState}
          onClose={onClose}
        />
      )}
    </StyledLoginModal>
  );
};

export default LoginModal;

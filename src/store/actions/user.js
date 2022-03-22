import { createAction } from '@reduxjs/toolkit';
import fakeApi from '../../api/fakeApi';
import { fetchUserLibrary, initUserLibrary } from './bookshelf';
import { storeApiError } from './globalAppActions';

export const setUserLoggedIn = createAction('setUserLoggedIn');
export const setUserLoggedOut = createAction('setUserLoggedOut');

export const userLogIn = (payload) => {
  return (dispatch, getState) => {
    fakeApi
      .post('/login', payload)
      .then((response) => {
        dispatch(
          setUserLoggedIn({
            userName: payload.email,
            userRoles: ['regularUser'],
            isLoggedIn: response.data.accessToken,
            userId: response.data.user.id,
          })
        );
        dispatch(fetchUserLibrary(response.data.user.id));
      })
      .catch((response) => {
        dispatch(storeApiError(response.response.data));
      });
  };
};

export const userRegister = (payload) => {
  return (dispatch, getState) => {
    fakeApi
      .post('/register', payload)
      .then((response) => {
        dispatch(
          setUserLoggedIn({
            userName: payload.email,
            userRoles: ['regularUser'],
            isLoggedIn: response.data.accessToken,
            userId: response.data.user.id,
          })
        );
        dispatch(fetchUserLibrary(response.data.user.id));
      })
      .catch((response) => {
        dispatch(storeApiError(response.response.data));
      });
  };
};

export const userLogOut = () => {
  return (dispatch, getState) => {
    dispatch(initUserLibrary([]));
    dispatch(setUserLoggedOut());
  };
};

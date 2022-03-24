import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import fakeApi from '../../api/fakeApi';
import { fetchUserLibrary, initUserLibrary } from './bookshelf';
import { storeApiError } from './globalAppActions';

export const setUserLoggedIn = createAction('setUserLoggedIn');
export const setUserLoggedOut = createAction('setUserLoggedOut');

export const userLogIn = createAsyncThunk('logInUser', async (payload, thunkApi) => {
  fakeApi
    .post('/login', payload)
    .then((response) => {
      thunkApi.dispatch(
        setUserLoggedIn({
          userName: payload.email,
          userRoles: ['regularUser'],
          isLoggedIn: response.data.accessToken,
          userId: response.data.user.id,
        })
      );
      thunkApi.dispatch(fetchUserLibrary(response.data.user.id));
    })
    .catch((response) => {
      thunkApi.dispatch(storeApiError(response.response.data));
    });
});

export const userRegister = createAsyncThunk('registerUser', async (payload, thunkApi) => {
  fakeApi
    .post('/register', payload)
    .then((response) => {
      thunkApi.dispatch(
        setUserLoggedIn({
          userName: payload.email,
          userRoles: ['regularUser'],
          isLoggedIn: response.data.accessToken,
          userId: response.data.user.id,
        })
      );
      thunkApi.dispatch(fetchUserLibrary(response.data.user.id));
    })
    .catch((response) => {
      thunkApi.dispatch(storeApiError(response.response.data));
    });
});

export const userLogOut = () => {
  return (dispatch, getState) => {
    dispatch(initUserLibrary([]));
    dispatch(setUserLoggedOut());
  };
};

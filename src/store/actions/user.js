import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import fakeApi from '../../api/fakeApi';
import { fetchUserLibrary, initUserLibrary } from './bookshelf';
import { removeApiError, storeApiError } from './globalAppActions';

export const setUserLoggedIn = createAction('setUserLoggedIn');
export const setUserLoggedOut = createAction('setUserLoggedOut');

export const updateUserEmail = createAction('updateUserEmail');

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
      payload.onSuccess();
      thunkApi.dispatch(removeApiError());
    })
    .catch((response) => {
      thunkApi.dispatch(storeApiError({ message: response.response.data, date: new Date() }));
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
      payload.onSuccess();
      thunkApi.dispatch(removeApiError());
    })
    .catch((response) => {
      thunkApi.dispatch(storeApiError({ message: response.response.data, date: new Date() }));
    });
});

export const userLogOut = () => {
  return (dispatch, getState) => {
    dispatch(initUserLibrary([]));
    dispatch(setUserLoggedOut());
  };
};

export const changeUserEmail = createAsyncThunk('changeUserEmail', async (payload, thunkApi) => {
  fakeApi.get(`users?email=${payload.email}`).then((response) => {
    if (response.data.length !== 0) {
      thunkApi.dispatch(storeApiError({ message: `Specified email ${payload.email} is already in use`, date: new Date() }));
    } else {
      fakeApi.patch(`/users/${payload.id}`, { email: payload.email }).then((response) => {
        thunkApi.dispatch(updateUserEmail(payload.email));
        payload.onSuccess();
        thunkApi.dispatch(removeApiError());
      });
    }
  });
});

export const changeUserPassword = createAsyncThunk('changeUserPassword', async (payload, thunkApi) => {
  fakeApi.patch(`/users/${payload.id}`, { password: payload.password }).then(() => {
    payload.onSuccess();
    thunkApi.dispatch(removeApiError());
  });
});

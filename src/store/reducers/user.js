import { setUserLoggedIn, setUserLoggedOut } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  userRoles: [],
  isLoggedIn: false,
  userId: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserLoggedIn, (state, action) => {
      state.userName = action.payload.userName;
      state.userRoles = action.payload.userRoles;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    })
    .addCase(setUserLoggedOut, (state, action) => {
      state.userName = '';
      state.userRoles = [];
      state.isLoggedIn = false;
      state.userId = '';
    });
});

export default user;

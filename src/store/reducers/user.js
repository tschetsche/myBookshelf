import { userLoggedIn, userLoggedOut } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  userRoles: [],
  isLoggedIn: false,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(userLoggedIn, (state, action) => {
      state.userName = action.payload.userName;
      state.userRoles = action.payload.userRoles;
      state.isLoggedIn = true;
    })
    .addCase(userLoggedOut, (state, action) => {
      state.userName = '';
      state.userRoles = [];
      state.isLoggedIn = false;
    });
});

export default user;

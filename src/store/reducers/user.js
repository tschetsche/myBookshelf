import { userLoggedIn, userLoggedOut } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  userRoles: [],
  isLoggedIn: false,
  bookshelves: [],
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(userLoggedIn, (state, action) => {
      state.userName = action.payload.userName;
      state.userRoles = action.payload.userRoles;
      state.isLoggedIn = true;
      state.bookshelves = action.payload.bookshelves;
    })
    .addCase(userLoggedOut, (state, action) => {
      state.userName = '';
      state.userRoles = [];
      state.isLoggedIn = false;
      state.bookshelves = [];
    });
});

export default user;

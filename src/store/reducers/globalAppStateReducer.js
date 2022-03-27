import { storeApiError, removeApiError } from '../actions/globalAppActions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  APIError: '',
};

const globalAppStateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(storeApiError, (state, action) => {
      state.APIError = action.payload;
    })
    .addCase(removeApiError, (state, action) => {
      state.APIError = '';
    });
});

export default globalAppStateReducer;

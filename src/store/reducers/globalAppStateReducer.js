import { storeApiError, removeApiError } from '../actions/globalAppActions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  APIError: null,
};

const globalAppStateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(storeApiError, (state, action) => {
      state.APIError = action.payload;
    })
    .addCase(removeApiError, (state, action) => {
      state.APIError = null;
    });
});

export default globalAppStateReducer;

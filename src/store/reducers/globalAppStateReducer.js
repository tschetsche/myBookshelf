import { storeApiError } from '../actions/globalAppActions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  APIError: '',
};

const globalAppStateReducer = createReducer(initialState, (builder) => {
  builder.addCase(storeApiError, (state, action) => {
    state.APIError = action.payload;
  });
});

export default globalAppStateReducer;

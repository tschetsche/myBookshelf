import { createReducer } from '@reduxjs/toolkit';
import { updateSearchResults } from '../actions/search';

const initialState = {
  searchResults: [],
};

const search = createReducer(initialState, (builder) => {
  builder.addCase(updateSearchResults, (state, action) => {
    state.searchResults = action.payload;
  });
});

export default search;

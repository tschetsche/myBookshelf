import { replaceBookList } from '../actions/bookList';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  bookList: null,
};

const bookReducer = createReducer(initialState, (builder) => {
  builder.addCase(replaceBookList, (state, action) => {
    state.bookList = action.payload;
  });
});

export default bookReducer;

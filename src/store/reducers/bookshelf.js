import { initBookshelfList, addBookshelfToList, addBookToShelf } from '../actions/bookshelf';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  bookshelfList: [],
};

const bookshelfReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initBookshelfList, (state, action) => {
      state.bookshelfList = [...action.payload];
    })
    .addCase(addBookshelfToList, (state, action) => {
      state.bookshelfList = [...state.bookshelfList, action.payload];
    })
    .addCase(addBookToShelf, (state, action) => {
      const { bookshelfId, bookId } = action.payload;
      const bookshelfIndex = state.bookshelfList.findIndex((el) => el.id === bookshelfId);
      state.bookshelfList[bookshelfIndex].books = [...state.bookshelfList[bookshelfIndex].books, bookId];
    });
});

export default bookshelfReducer;

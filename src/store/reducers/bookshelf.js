import { initBookshelfList, initUserLibrary, addBookToShelf, replaceBookData, removeBook } from '../actions/bookshelf';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  bookshelfList: [],
  library: [],
};

const bookshelfReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initBookshelfList, (state, action) => {
      state.bookshelfList = [...action.payload];
    })
    .addCase(initUserLibrary, (state, action) => {
      state.library = action.payload;
    })
    .addCase(replaceBookData, (state, action) => {
      const booksToKeep = state.library.filter((book) => book.id !== action.payload.id);
      state.library = [...booksToKeep, action.payload];
    })
    .addCase(removeBook, (state, action) => {
      const booksToKeep = state.library.filter((book) => book.id !== action.payload);
      state.library = [...booksToKeep];
    })
    .addCase(addBookToShelf, (state, action) => {
      state.library = [...state.library, action.payload];
    });
});

export default bookshelfReducer;

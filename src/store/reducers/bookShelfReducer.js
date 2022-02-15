import { addBookshelfToList, addBookshelf, addBookToShelf } from '../actions/bookShelf';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  bookshelfList: null,
  bookshelves: null,
};

const bookshelfReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBookshelfToList, (state, action) => {
      state.bookshelfList = action.payload;
    })
    .addCase(addBookshelf, (state, action) => {
      const bookshelves = {};
      action.payload.forEach((bookshelf) => {
        bookshelves[bookshelf] = [];
      });
      state.bookshelves = bookshelves;
    })
    .addCase(addBookToShelf, (state, action) => {
      const { book, bookshelf } = action.payload;
      const updatedBookshelfList = [...new Set([...state.bookshelves[bookshelf], book])];
      const unpatedBookshelves = {
        ...state.bookshelves,
        [bookshelf]: updatedBookshelfList,
      };
      state.bookshelves = unpatedBookshelves;
    });
});

export default bookshelfReducer;

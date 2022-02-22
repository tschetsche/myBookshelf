import { addBookshelvesToList, addBookshelfToList, addBookToShelf } from '../actions/bookshelf';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  bookshelfList: [],
  bookshelves: {},
};

const bookshelfReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBookshelvesToList, (state, action) => {
      state.bookshelfList = [...new Set([...state.bookshelfList, ...action.payload])];
    })
    .addCase(addBookshelfToList, (state, action) => {
      state.bookshelfList = [...state.bookshelfList, action.payload];
    })
    .addCase(addBookToShelf, (state, action) => {
      const { book, bookshelf } = action.payload;
      const updatedBookshelf = [...new Set([...(state.bookshelves[bookshelf] || []), book])];
      state.bookshelves = {
        ...state.bookshelves,
        [bookshelf]: updatedBookshelf,
      };
    });
});

export default bookshelfReducer;

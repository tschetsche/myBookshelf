import { createSelector } from '@reduxjs/toolkit';

export const selectBookshelfList = (state) => state.bookshelf.bookshelfList;
export const selectUserLibrary = (state) => state.bookshelf.library;

export const selectBookshelfById = createSelector([selectUserLibrary, (state, bookshelfId) => bookshelfId], (books, bookshelfId) => {
  const booksFiltered = books.filter((book) => book.bookshelfId === bookshelfId);
  return booksFiltered.length === 0 ? null : booksFiltered;
});

export const selectUserBookMetaById = createSelector([selectUserLibrary, (state, bookId) => bookId], (books, bookId) =>
  books.find((book) => book.bookId === bookId)
);

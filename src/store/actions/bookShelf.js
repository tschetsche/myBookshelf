import { createAction } from '@reduxjs/toolkit';

export const initBookshelfList = createAction('initBookshelfList');
export const addBookshelfToList = createAction('addBookshelfToList');
export const addBookToShelf = createAction('addBookToShelf');

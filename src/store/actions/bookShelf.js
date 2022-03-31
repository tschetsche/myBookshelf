import { createAction } from '@reduxjs/toolkit';
import fakeApi from '../../api/fakeApi';

export const initBookshelfList = createAction('initBookshelfList');
export const replaceBookshelf = createAction('replaceBookshelf');
export const addBookToShelf = createAction('addBookToShelf');
export const initUserLibrary = createAction('initUserLibrary');
export const replaceBookData = createAction('replaceBookData');
export const removeBook = createAction('removeBook');

const addBookToBookshelfStart = createAction('addBookToBookshelfStart');
const addBookToBookshelfFinish = createAction('addBookToBookshelfFinish');

export const addBookToBookshelf = (userId, book) => {
  return (dispatch, getState) => {
    dispatch(addBookToBookshelfStart);
    fakeApi.post(`user/${userId}/library`, book).then((response) => {
      dispatch(addBookToShelf(response.data));
    });
    dispatch(addBookToBookshelfFinish);
  };
};

export const updateUserBook = (recordId, payload) => {
  return (dispatch, getState) => {
    fakeApi.patch(`library/${recordId}`, payload).then((response) => {
      dispatch(replaceBookData(response.data));
    });
  };
};

export const removeBookFromLibrary = (recordId) => {
  return (dispatch, getState) => {
    fakeApi.delete(`library/${recordId}`).then((response) => {
      dispatch(removeBook(recordId));
    });
  };
};

export const fetchUserLibrary = (userId) => {
  return (dispatch, getState) => {
    fakeApi.get(`/user/${userId}/library`).then((response) => {
      dispatch(initUserLibrary(response.data));
    });
  };
};

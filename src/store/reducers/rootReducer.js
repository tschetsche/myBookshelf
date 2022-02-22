import bookList from './bookList';
import bookshelf from './bookshelf';
import user from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ bookList, bookshelf, user });

export default rootReducer;

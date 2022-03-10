import bookList from './bookList';
import bookshelf from './bookshelf';
import user from './user';
import globalAppState from './globalAppStateReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ bookList, bookshelf, user, globalAppState });

export default rootReducer;

import bookReducer from './bookListReducer';
import bookshelfReducer from './bookShelfReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ bookReducer, bookshelfReducer });

export default rootReducer;

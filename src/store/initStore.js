import { createStore, applyMiddleware, compose } from 'redux';
import bookReducer from './reducers/bookListReducer';
import { enableES5 } from 'immer';
enableES5();

const middleWare = [];
const middleWareEnhancer = applyMiddleware(...middleWare);

const enhancers = [middleWareEnhancer];
const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(...enhancers) : compose([...enhancers]);

const store = createStore(bookReducer, undefined, composedEnhancers);

export default store;

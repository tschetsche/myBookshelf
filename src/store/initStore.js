import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import { enableES5 } from 'immer';
enableES5();

const middleWare = [];
const middleWareEnhancer = applyMiddleware(...middleWare);

const enhancers = [middleWareEnhancer];
const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(...enhancers) : compose(...enhancers);

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;

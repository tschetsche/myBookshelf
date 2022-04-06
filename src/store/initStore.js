import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { enableES5 } from 'immer';
enableES5();

const middleWare = [thunk];
const middleWareEnhancer = applyMiddleware(...middleWare);

const enhancers = [middleWareEnhancer];
const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers)
  : compose(...enhancers);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['globalAppState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

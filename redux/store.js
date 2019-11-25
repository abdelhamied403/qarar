import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import moment from 'moment';

const expireReducer = require('redux-persist-expire');

const initialAuthState = {
  token: '',
  logoutToken: '',
  accessToken: '',
  name: '',
  uid: ''
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.token,
        logoutToken: action.logoutToken,
        accessToken: action.accessToken,
        name: action.name,
        uid: action.uid,
        expireAt: moment()
          .add(1, 'y')
          .format()
      };
    case 'LOGOUT':
      return initialAuthState;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'primary',
  storage,
  transforms: [
    expireReducer('auth', {
      persistedAtKey: 'expireAt',
      expireSeconds: 5,
      expiredState: initialAuthState,
      autoExpire: false
    })
  ]
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ auth: authReducer })
);

export function initializeStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger))
  );
}

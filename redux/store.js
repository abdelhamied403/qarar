import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  token: '',
  logoutToken: '',
  name: '',
  uid: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.token,
        logoutToken: action.logoutToken,
        name: action.name,
        uid: action.uid
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'primary',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export function initializeStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}

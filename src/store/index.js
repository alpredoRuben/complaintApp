import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AuthReducer, SetTotalNotification, CartReducer} from '../reducers';

const rootReducer = combineReducers({
  AuthReducer,
  SetTotalNotification,
  CartReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['AuthReducer', 'CartReducer'],
  },
  rootReducer,
);

const composeEnhancers = composeWithDevTools({shouldHotReload: false});

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(ReduxThunk)),
  );
  let persistor = persistStore(store);

  return {store, persistor};
};

import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {LoginReducer} from './reducers/UserReducer';

const rootReducer = combineReducers({
  userSignIn: LoginReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export default store;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const userTokenFromStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { token: userTokenFromStorage, userInfo: userInfoFromStorage },
};

const middleware = [thunk];

//const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const hasAccessOfDevTools = process.env.NODE_ENV === "production" ? applyMiddleware(...middleware) : composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, hasAccessOfDevTools);

export default store;
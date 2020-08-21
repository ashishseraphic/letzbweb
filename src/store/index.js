import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "../reducers";

const store = configureStore({});

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(reducer, initialState, enhancer);
}

export default store;

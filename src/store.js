import { createStore, applyMiddleware, compose } from "redux";
import { middleware as reduxPackMiddleware } from "redux-pack";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, reduxPackMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  )
);
export default store;

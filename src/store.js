import { createStore, applyMiddleware } from "redux";
import { middleware as reduxPackMiddleware } from "redux-pack";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, reduxPackMiddleware)
);
export default store;

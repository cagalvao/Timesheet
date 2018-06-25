import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import thunk from "redux-thunk";

import reducers from "./reducers";

import Main from "./components/main/index";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".wrapper")
);

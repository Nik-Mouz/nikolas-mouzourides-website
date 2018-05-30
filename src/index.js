import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Home from "./Components/Home/Home";
import store from "./Config/Store";
import "sanitize.css/sanitize.css";
import "./index.css";

const target = document.querySelector("#root");
render(
  <Provider store={store}>
    <Home />
  </Provider>,
  target
);

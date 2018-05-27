import React from "react";
import { render } from "react-dom";
import Home from "./Components/Home/Home";

import "sanitize.css/sanitize.css";
import "./index.css";

const target = document.querySelector("#root");

render(
  <Home/>,
  target
);

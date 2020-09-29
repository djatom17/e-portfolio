import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { render } from "@testing-library/react";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});

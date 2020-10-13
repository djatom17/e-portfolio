import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { render } from "@testing-library/react";
import App from "./App";
import Profile3 from "/component/auth/Profile3";
import ProfileData from "./api/ProfileData";

// practice test
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("Front-end tests", () => {
  // Create mocking functions to be used for rendering.
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  // Start tests
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });
});

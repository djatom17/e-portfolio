import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { render } from "@testing-library/react";
import App from "./App";
import Profile3 from "./component/auth/Profile3";
import ProfileData from "./api/ProfileData";
import AchievementManager from "./component/profileDisplays/AchievementManager";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
configure({ adapter: new Adapter() });

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

// testing AchievementManager
describe("<AchievementManager /> component", () => {
  it("should render", () => {
    const achievements = mount(
      <AchievementManager
        isMyProfile={true}
        canEdit={true}
        data={[
          "Pro Golf Champion",
          "Cross Country Cyclist",
          "Founder of Charity Hackathon",
        ]}
        changeList={() => {
          alert("function called");
        }}
      />
    );
    const value = achievements.find("Paragraph").at(1).text();
    expect(value).toEqual("Pro Golf Champion");
  });
});

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { render } from "@testing-library/react";
import App from "./App";
import Profile5 from "./component/auth/Profile5";
import ProfileData from "./api/ProfileData";
import AchievementManager from "./component/profileDisplays/AchievementManager";
import EditButton from "./component/profileDisplays/EditButton";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
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

// testing AchievementManager
describe("<Edit Button /> component", () => {
  it("should render", () => {
    const achievements = mount(
      <EditButton isMyProfile={true} canEdit={true} />
    );
    const value = achievements.find("Button");
    expect(value).toEqual("Pro Golf Champion");
  });
});

// describe("Profile Layout 5 ", () => {
//   it("when there the user does not have authentication", () => {
//     const prof3 = mount(
//       <Provider store={store}>
//         <Profile5 />{" "}
//       </Provider>
//     );
//     prof3.getInstance().setState({ isMyProfile: false });
//     expect(prof3).toMatchSnapshot();
//   });

//   it("when there the user has authentication", () => {
//     const prof3 = mount(
//       <Provider store={store}>
//         <Profile5 />{" "}
//       </Provider>
//     );
//     prof3.getInstance().setState({ isMyProfile: true });
//     expect(prof3).toMatchSnapshot();
//   });
// });

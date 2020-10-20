import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { render } from "@testing-library/react";
import App from "./App";
import Profile5 from "./component/auth/Profile5";
import ProfileData from "./api/ProfileData";
import AchievementManager from "./component/profileDisplays/AchievementManager";
import SkillManager from "./component/profileDisplays/SkillManager";

import EditButton from "./component/profileDisplays/EditButton";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Settings from "./component/profileDisplays/Settings";

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
      <Provider store={store}>
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
      </Provider>
    );
    const value = achievements.find("Paragraph").at(1).text();
    expect(value).toEqual("Pro Golf Champion");
  });
});

// Testing SkillManager
describe("<SkillManager /> component", () => {
  it("should render", () => {
    const skills = mount(
      <Provider store={store}>
        <SkillManager
          isMyProfile={true}
          canEdit={true}
          data={["Python", "Google Maps", "Oregami"]}
          changeList={() => {
            alert("function called");
          }}
        />
      </Provider>
    );
    const value = skills.find("Tag").at(0).text();
    expect(value).toEqual("Python");
  });
});

// testing EditButton
describe("<Edit Button /> component", () => {
  it("should render as Done", () => {
    const editButt = mount(
      <Provider store={store}>
        <EditButton isMyProfile={true} canEdit={true} />
      </Provider>
    );
    const value = editButt.find("Button").text();
    expect(editButt.find("Button").exists()).toBeTruthy() &&
      expect(value).toEqual("Done");
  });
  it("should render as Edit", () => {
    const editButt = mount(
      <Provider store={store}>
        <EditButton isMyProfile={true} canEdit={false} />
      </Provider>
    );
    const value = editButt.find("Button").text();
    expect(editButt.find("Button").exists()).toBeTruthy() &&
      expect(value).toEqual("Edit");
  });
  it("should not render if there isnt auth", () => {
    const editButt = mount(
      <Provider store={store}>
        <EditButton isMyProfile={false} canEdit={false} />
      </Provider>
    );
    expect(editButt.find("Button").exists()).toBeFalsy();
  });
});

describe("Profile Layout 5 ", () => {
  const prof = (
    <Profile5
      isMyProfile={true}
      isAuthenticated={true}
      user={{ _id: "0111" }}
      profile={{
        userid: "0111",
        firstName: "Aa",
        lastName: "DjN",
        keySkills: ["Python", "C", "More Skills"],
        layout: "5",
        subtitle: "Idek anymore",
        achievements: ["Did something", "And that"],
      }}
    />
  );
  it("when the user does not have authentication", () => {
    const prof5 = mount(<Provider store={store}>{prof} </Provider>);
    // prof5.getInstance().setState({ isMyProfile: false });
    expect(prof5.debug()).toMatchSnapshot();
  });

  // it("Settings render?", () => {
  //   const prof5 = shallow(<Provider store={store}>{prof} </Provider>);
  //   expect(prof5.find("Settings").exists()).toBeTruthy();
  //    expect(prof5.find(Settings)).toHaveLength(1);
  //   expect(prof5.containsMatchingElement(<Settings />)).toEqual(true);
  // });
  // // it("when there the user has authentication", () => {
  //   const prof5 = mount(
  //     <Provider store={store}>
  //       <Profile5 />{" "}
  //     </Provider>
  //   );
  //   prof5.getInstance().setState({ isMyProfile: true });
  //   expect(prof5).toMatchSnapshot();
  // });
});

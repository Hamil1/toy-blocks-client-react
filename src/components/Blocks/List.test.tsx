import { shallow } from "enzyme";
import { truncate } from "fs";
import Block from "./Block";
import List from "./List";

describe("<Block />", () => {
    const blocks = [
      {
        id: 1,
        attributes: {
          data: "The Human Torch",
        },
      },
      {
        id: 2,
        attributes: {
          data: "is denied",
        },
      },
    ];

  it("should contain <List />", () => {
      const wrapper = shallow(<List blocks={blocks} loading={false} error={false} />);
    expect(wrapper.find(Block).length).toEqual(2);
  });
    
  it("should show empty blocks message when the block list is empty", () => {
    const wrapper = shallow(
      <List blocks={[]} loading={false} error={false} />
    );
    expect(wrapper.text()).toBe("No blocks found.");
  });
    
    it("should show an error message when error props is set it to true", () => {
      const wrapper = shallow(
        <List blocks={[]} loading={false} error={true} />
      );
      expect(wrapper.text()).toBe("Error loading blocks...");
    });

    it("should show loading message when loading props is true", () => {
      const wrapper = shallow(
        <List blocks={[]} loading={true} error={false} />
      );
      expect(wrapper.text()).toBe("Loading blocks...");
    });
});

import { shallow } from "enzyme";
import Block from "./Block";

describe("<Block />", () => {
  const obj = {
    id: 1,
    attributes: {
      data: "The Human Torch",
    },
  };

  it("should contain <Block />", () => {
    const wrapper = shallow(<Block block={obj} />);
    expect(wrapper.text()).toBe("1The Human Torch");
  });
});

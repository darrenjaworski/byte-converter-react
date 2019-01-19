import React from "react";
import renderer from "react-test-renderer";

import ByteConverter from "./index";

it("renders correctly", () => {
  const tree = renderer.create(<ByteConverter>1024</ByteConverter>).toJSON();
  expect(tree).toMatchSnapshot();
});

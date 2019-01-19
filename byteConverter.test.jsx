import React from "react";
import renderer from "react-test-renderer";

import ByteConverter from "./index";

describe("ByteConverter", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(<ByteConverter>1024</ByteConverter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

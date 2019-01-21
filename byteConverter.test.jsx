import React from "react";
import renderer from "react-test-renderer";

import ByteConverter from "./index";

describe("ByteConverter", () => {
  it("renders without crashing", () => {
    const tree = renderer
      .create(<ByteConverter>{1024}</ByteConverter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("can convert bytes correctly", () => {
    const MBvalue = renderer
      .create(
        <ByteConverter inUnit="KB" outUnit="MB">
          1024
        </ByteConverter>
      )
      .toJSON();

    const GBvalue = renderer
      .create(
        <ByteConverter useSI inUnit="MB" outUnit="GB">
          1000
        </ByteConverter>
      )
      .toJSON();

    expect(MBvalue).toBe("1");
    expect(GBvalue).toBe("1");
  });

  // permutations
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];

  units.forEach(InUnit => {
    units.forEach(OutUnit => {
      it(`inUnit ${InUnit}, outUnit ${OutUnit} matches snapshot`, () => {
        const tree = renderer
          .create(
            <ByteConverter inUnit={InUnit} outUnit={OutUnit}>
              {1024}
            </ByteConverter>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  it("should render with commas", () => {
    const commas = renderer
      .create(
        <ByteConverter addCommas inUnit="GB" outUnit="MB">
          {1}
        </ByteConverter>
      )
      .toJSON();
    expect(commas).toBe("1,024");
  });

  const unitSuffixes = {
    B: "byte",
    KB: "kilobyte",
    MB: "megabyte",
    GB: "gigabyte",
    TB: "terabyte",
    PB: "petabyte"
  };

  const suffixes = Object.keys(unitSuffixes);

  suffixes.forEach(suffix => {
    const suffixString = unitSuffixes[suffix];
    it(`should add the suffix ${suffixString}s`, () => {
      const result = renderer
        .create(
          <ByteConverter suffix inUnit="PB" outUnit={suffix}>
            {10}
          </ByteConverter>
        )
        .toJSON();

      const resultSuffix = result[1];
      expect(resultSuffix.trim()).toBe(`${suffixString}s`);
    });
  });

  it("should have a singular suffix when exactly one is resulting", () => {
    const result = renderer
      .create(
        <ByteConverter suffix inUnit="KB">
          {1024}
        </ByteConverter>
      )
      .toJSON();

    const resultSuffix = result[1];
    expect(resultSuffix.trim()).toBe("megabyte");
  });

  it("should warn with an infinite number", () => {
    const spyWarn = jest.spyOn(console, "warn");
    renderer.create(<ByteConverter>{-Infinity}</ByteConverter>);
    renderer.create(<ByteConverter>{Infinity}</ByteConverter>);
    expect(spyWarn).toHaveBeenCalledTimes(5);
  });

  it("should warn with a non integer number", () => {
    const spyWarn = jest.spyOn(console, "warn");
    renderer.create(<ByteConverter>{10.1}</ByteConverter>);
    expect(spyWarn).toHaveBeenCalledTimes(6);
  });

  it("should warn with a negative number", () => {
    const spyWarn = jest.spyOn(console, "warn");
    renderer.create(<ByteConverter>{-10}</ByteConverter>);
    expect(spyWarn).toHaveBeenCalledTimes(7);
  });

  it("should warn when not a number", () => {
    const spyWarn = jest.spyOn(console, "warn");
    renderer.create(<ByteConverter>blah</ByteConverter>);
    expect(spyWarn).toHaveBeenCalledTimes(11);
  });

  it("should suppress warnings when `hideWarnings` is present", () => {
    const spyWarn = jest.spyOn(console, "warn");
    renderer.create(<ByteConverter hideWarnings>{-Infinity}</ByteConverter>);
    renderer.create(<ByteConverter hideWarnings>{Infinity}</ByteConverter>);
    renderer.create(<ByteConverter hideWarnings>{10.1}</ByteConverter>);
    renderer.create(<ByteConverter hideWarnings>{-10}</ByteConverter>);
    expect(spyWarn).not.toHaveBeenCalledTimes(12);
  });
});

import React from "react";
import propTypes from "prop-types";

const units = ["b", "B", "KB", "MB", "GB", "TB", "PB"];
const mapUnitsToPower = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
  PB: 5
};

const ByteConverter = props => {
  const { children, hideWarnings, useSI, inUnit, outUnit } = props;

  // warn if children is integer or negative

  return <>{children}</>;
};

ByteConverter.propTypes = {
  children: propTypes.number.isRequired,
  hideWarnings: propTypes.bool,
  useSI: propTypes.bool,
  inUnit: propTypes.oneOf(units),
  outUnit: propTypes.oneOf(units)
};

ByteConverter.defaultProps = {
  hideWarnings: false,
  useSI: false,
  inUnit: units[1],
  outUnit: units[3]
};

export default ByteConverter;

// - Children should always be a number. Warn on negative and noninteger values.  Suppress warnings with a prop.

// - Ability to specify input units (default "B" for bytes)

// - Ability to specify output units. Default "*iB" for auto-binary-prefixed Bytes.

// Let's say for some reason I have total bits and I want to output as auto-metric-prefixed Bytes:

// inUnits="b"
// outUnits="*B"

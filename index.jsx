// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const units = ["B", "KB", "MB", "GB", "TB", "PB"];
const conversionFactor = {
  B: 1,
  KB: 2 ** 10,
  MB: 2 ** 20,
  GB: 2 ** 40,
  TB: 2 ** 80,
  PB: 2 ** 160
};

const ByteConverter = props => {
  const { children, hideWarnings, inUnit, outUnit } = props;

  const isInteger = Number.isInteger(children);
  const isFinite = Number.isFinite(children);
  const isPositive = children > 0;

  if (!hideWarnings) {
    if (!isInteger) {
      console.warn("ByteConverter must recieve an integer as a child.");
    }

    if (!isFinite) {
      console.warn("ByteConverter must recieve a finite integer as a child");
    }

    if (!isPositive) {
      console.warn("ByteConverter must recieve a positive integer as a child");
    }
  }

  const conversion =
    children * conversionFactor[inUnit] * (1 / conversionFactor[outUnit]);

  return <>{conversion}</>;
};

ByteConverter.propTypes = {
  children: PropTypes.number.isRequired,
  hideWarnings: PropTypes.bool,
  // useSI: PropTypes.bool,
  inUnit: PropTypes.oneOf(units),
  outUnit: PropTypes.oneOf(units)
};

ByteConverter.defaultProps = {
  hideWarnings: false,
  // useSI: false,
  inUnit: units[0],
  outUnit: units[2]
};

export default ByteConverter;

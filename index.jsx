// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const units = {
  B: { conversionFactor: 0, suffix: "byte" },
  KB: { conversionFactor: 1, suffix: "kilobyte" },
  MB: { conversionFactor: 2, suffix: "megabyte" },
  GB: { conversionFactor: 3, suffix: "gigabyte" },
  TB: { conversionFactor: 4, suffix: "terabyte" },
  PB: { conversionFactor: 5, suffix: "petabyte" }
};

const ByteConverter = props => {
  const {
    children,
    hideWarnings,
    useSI,
    suffix,
    addCommas,
    inUnit,
    outUnit
  } = props;

  const kiddo = Number(children);

  const isInteger = Number.isInteger(kiddo);
  const isFinite = Number.isFinite(kiddo);
  const isPositive = kiddo > 0;
  const isNotANumber = Number.isNaN(kiddo);

  if (!hideWarnings) {
    if (!isInteger) {
      console.warn("ByteConverter must recieve an integer as a child."); // eslint-disable-line no-console
    }

    if (!isFinite) {
      console.warn("ByteConverter must recieve a finite integer as a child."); // eslint-disable-line no-console
    }

    if (!isPositive) {
      console.warn("ByteConverter must recieve a positive integer as a child."); // eslint-disable-line no-console
    }

    if (isNotANumber) {
      // eslint-disable-next-line no-console
      console.warn(
        "ByteConverter must recieve a number or valid number as a string as a child"
      );
    }
  }

  const InConversion = useSI
    ? 1000 ** units[inUnit].conversionFactor
    : 1024 ** units[inUnit].conversionFactor;
  const OutConversion = useSI
    ? 1000 ** units[outUnit].conversionFactor
    : 1024 ** units[outUnit].conversionFactor;

  let conversion = (kiddo * InConversion) / OutConversion;

  if (addCommas) {
    conversion = conversion.toLocaleString();
  }

  const suffixDisplay = suffix
    ? ` ${units[outUnit].suffix}${conversion === 1 ? "" : "s"}`
    : null;

  return (
    <>
      {conversion}
      {suffixDisplay}
    </>
  );
};

ByteConverter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  hideWarnings: PropTypes.bool,
  useSI: PropTypes.bool,
  suffix: PropTypes.bool,
  addCommas: PropTypes.bool,
  inUnit: PropTypes.oneOf(Object.keys(units)),
  outUnit: PropTypes.oneOf(Object.keys(units))
};

ByteConverter.defaultProps = {
  hideWarnings: false,
  useSI: false,
  suffix: false,
  addCommas: false,
  inUnit: Object.keys(units)[0],
  outUnit: Object.keys(units)[2]
};

export default ByteConverter;

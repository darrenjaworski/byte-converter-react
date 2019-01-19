// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const units = ["B", "KB", "MB", "GB", "TB", "PB"];
const conversionFactor = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
  PB: 5
};
const unitSuffix = {
  B: "byte",
  KB: "kilobyte",
  MB: "megabyte",
  GB: "gigabyte",
  TB: "terabyte",
  PB: "petabyte"
};

const ByteConverter = props => {
  const {
    children,
    hideWarnings,
    suffix,
    addCommas,
    useSI,
    inUnit,
    outUnit
  } = props;

  const kiddo = Number(children);

  const isInteger = Number.isInteger(kiddo);
  const isFinite = Number.isFinite(kiddo);
  const isPositive = kiddo > 0;

  if (!hideWarnings) {
    if (!isInteger) {
      console.warn("ByteConverter must recieve an integer as a child."); // eslint-disable-line no-console
    }

    if (!isFinite) {
      console.warn("ByteConverter must recieve a finite integer as a child"); // eslint-disable-line no-console
    }

    if (!isPositive) {
      console.warn("ByteConverter must recieve a positive integer as a child"); // eslint-disable-line no-console
    }
  }

  const InConversion = useSI
    ? 1000 ** conversionFactor[inUnit]
    : 1024 ** conversionFactor[inUnit];
  const OutConversion = useSI
    ? 1000 ** conversionFactor[outUnit]
    : 1024 ** conversionFactor[outUnit];

  let conversion = (children * InConversion) / OutConversion;

  if (addCommas) {
    conversion = conversion.toLocaleString();
  }

  const suffixDisplay = suffix
    ? ` ${unitSuffix[outUnit]}${conversion === 1 ? "" : "s"}`
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
  inUnit: PropTypes.oneOf(units),
  outUnit: PropTypes.oneOf(units)
};

ByteConverter.defaultProps = {
  hideWarnings: false,
  useSI: false,
  suffix: false,
  addCommas: false,
  inUnit: units[0],
  outUnit: units[2]
};

export default ByteConverter;

// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const units = ["B", "KB", "MB", "GB", "TB", "PB"];
const conversionFactor = {
  decimal: {
    B: 1,
    KB: 1000,
    MB: 1000 ** 2,
    GB: 1000 ** 3,
    TB: 1000 ** 4,
    PB: 1000 ** 5
  },
  binary: {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5
  }
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

  const InConversion = useSI
    ? conversionFactor.decimal[inUnit]
    : conversionFactor.binary[inUnit];
  const OutConversion = useSI
    ? conversionFactor.decimal[outUnit]
    : conversionFactor.binary[outUnit];

  let conversion = children * InConversion * (1 / OutConversion);

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
  children: PropTypes.number.isRequired,
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

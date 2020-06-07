// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const units = {
  B: { conversionFactor: 0, suffix: "byte" },
  KB: { conversionFactor: 1, suffix: "kilobyte" },
  MB: { conversionFactor: 2, suffix: "megabyte" },
  GB: { conversionFactor: 3, suffix: "gigabyte" },
  TB: { conversionFactor: 4, suffix: "terabyte" },
  PB: { conversionFactor: 5, suffix: "petabyte" },
  b: { conversionFactor: 0, suffix: "bit" },
};

const ByteConverter = (props) => {
  const {
    children,
    hideWarnings,
    useSI,
    suffix,
    addCommas,
    inUnit,
    outUnit,
  } = props;

  let kiddo = Number(children);

  const kiddoIsInteger = Number.isInteger(kiddo);
  const kiddoIsFinite = Number.isFinite(kiddo);
  const kiddoIsPositive = kiddo > 0;
  const kiddoIsNotANumber = Number.isNaN(kiddo);

  if (!hideWarnings) {
    if (!Object.prototype.hasOwnProperty.call(units, inUnit)) {
      console.warn("ByteConvert has recieved invalid inUnit prop."); // eslint-disable-line no-console
    }

    if (!Object.prototype.hasOwnProperty.call(units, inUnit)) {
      console.warn("ByteConvert has recieved invalid inUnit prop."); // eslint-disable-line no-console
    }

    if (!kiddoIsInteger) {
      console.warn("ByteConverter must recieve an integer as a child."); // eslint-disable-line no-console
    }

    if (!kiddoIsFinite) {
      console.warn("ByteConverter must recieve a finite integer as a child."); // eslint-disable-line no-console
    }

    if (!kiddoIsPositive) {
      console.warn("ByteConverter must recieve a positive integer as a child."); // eslint-disable-line no-console
    }

    if (kiddoIsNotANumber) {
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

  if (inUnit === "b") {
    kiddo /= 8;
  }

  let conversion = (kiddo * InConversion) / OutConversion;

  if (outUnit === "b") {
    conversion *= 8;
  }

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
  outUnit: PropTypes.oneOf(Object.keys(units)),
};

ByteConverter.defaultProps = {
  hideWarnings: false,
  useSI: false,
  suffix: false,
  addCommas: false,
  inUnit: Object.keys(units)[0],
  outUnit: Object.keys(units)[2],
};

export default ByteConverter;

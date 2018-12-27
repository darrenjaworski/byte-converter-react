import React from "react";

import PropTypes from "prop-types";

const BitConverter = () => {};

const units = ["b", "B", "KB", "MB", "GB", "TB", "PB"];

BitConverter.PropTypes = {
  Children: PropTypes.number.isRequired,
  hideWarnings: PropTypes.bool,
  useSI: PropTypes.bool,
  inUnit: PropTypes.oneOf(units),
  outUnit: PropTypes.oneOf(units)
};

BitConverter.defaultProps = {
  hideWarnings: false,
  useSI: false,
  inUnit: units[1],
  outUnit: units[3]
};

export default BitConverter;

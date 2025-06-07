import React from 'react';

type Unit = "b" | "B" | "KB" | "MB" | "GB" | "TB" | "PB";

export interface ByteConverterProps {
  children: React.ReactNode;
  hideWarnings?: boolean;
  suffix?: boolean;
  inUnit?: Unit;
  outUnit?: Unit;
  addCommas?: boolean;
  useSI?: boolean;
}

const UNITS: Record<Unit, { multiplier: number; siMultiplier: number; isBit: boolean }> = {
  b: { multiplier: 1 / 8, siMultiplier: 1 / 8, isBit: true },
  B: { multiplier: 1, siMultiplier: 1, isBit: false },
  KB: { multiplier: 1024, siMultiplier: 1000, isBit: false },
  MB: { multiplier: Math.pow(1024, 2), siMultiplier: Math.pow(1000, 2), isBit: false },
  GB: { multiplier: Math.pow(1024, 3), siMultiplier: Math.pow(1000, 3), isBit: false },
  TB: { multiplier: Math.pow(1024, 4), siMultiplier: Math.pow(1000, 4), isBit: false },
  PB: { multiplier: Math.pow(1024, 5), siMultiplier: Math.pow(1000, 5), isBit: false },
};

const UNIT_LABELS: Record<Unit, string> = {
  b: 'bit',
  B: 'byte',
  KB: 'kilobyte',
  MB: 'megabyte',
  GB: 'gigabyte',
  TB: 'terabyte',
  PB: 'petabyte',
};

function formatNumber(value: number, addCommas: boolean) {
  if (addCommas) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  return parseFloat(value.toFixed(2)).toString();
}

export const ByteConverter: React.FC<ByteConverterProps> = ({
  children,
  hideWarnings = false,
  suffix = false,
  inUnit = "B",
  outUnit = "MB",
  addCommas = false,
  useSI = false,
}) => {
  const inputValue = parseFloat(String(children));

  if (isNaN(inputValue) || !isFinite(inputValue) || inputValue < 0) {
    if (!hideWarnings) {
      console.warn(
        'ByteConverter must recieve a positive integer as a child.'
      );
    }
    // Match previous version: attempt conversion, do not return original children
    // This will result in a very small number for negative input, as in the previous version
    // Continue to conversion logic
  }

  const inMeta = UNITS[inUnit];
  const outMeta = UNITS[outUnit];
  const inMultiplier = useSI ? inMeta.siMultiplier : inMeta.multiplier;
  const outMultiplier = useSI ? outMeta.siMultiplier : outMeta.multiplier;

  let valueInBytes = inputValue * inMultiplier;
  if (inMeta.isBit && !outMeta.isBit) {
    // bits to bytes (already handled by multiplier)
  } else if (!inMeta.isBit && outMeta.isBit) {
    valueInBytes = valueInBytes * 8;
  }

  let convertedValue: number;
  if (outMeta.isBit) {
    convertedValue = valueInBytes * 8;
  } else {
    convertedValue = valueInBytes / outMultiplier;
  }

  // Remove clamping for invalid input to match legacy output
  // if (Math.abs(convertedValue) < 0.01) {
  //   convertedValue = 0;
  // }

  let output = formatNumber(convertedValue, addCommas);
  if (suffix) {
    output += ` ${UNIT_LABELS[outUnit]}`;
  }

  return <>{output}</>;
};

export default ByteConverter;

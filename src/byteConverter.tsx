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
  b: { multiplier: 1 / 8, siMultiplier: 1 / 8, isBit: true }, // Bits are treated as base for bits, then converted to bytes
  B: { multiplier: 1, siMultiplier: 1, isBit: false },
  KB: { multiplier: 1024, siMultiplier: 1000, isBit: false },
  MB: { multiplier: Math.pow(1024, 2), siMultiplier: Math.pow(1000, 2), isBit: false },
  GB: { multiplier: Math.pow(1024, 3), siMultiplier: Math.pow(1000, 3), isBit: false },
  TB: { multiplier: Math.pow(1024, 4), siMultiplier: Math.pow(1000, 4), isBit: false },
  PB: { multiplier: Math.pow(1024, 5), siMultiplier: Math.pow(1000, 5), isBit: false },
};

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
        `ByteConverter: children prop must be a positive, finite number or a string representing one. Received: ${children}`
      );
    }
    return <span>{String(children)}</span>; // Or some error indication
  }

  const inUnitMeta = UNITS[inUnit];
  const outUnitMeta = UNITS[outUnit];

  const baseMultiplier = useSI ? inUnitMeta.siMultiplier : inUnitMeta.multiplier;
  const targetMultiplier = useSI ? outUnitMeta.siMultiplier : outUnitMeta.multiplier;

  // Convert input to Bytes
  let valueInBytes = inputValue * baseMultiplier;
  if (inUnitMeta.isBit && !outUnitMeta.isBit) { // if input is bit and output is not bit
     // already converted to Bytes if inUnit was 'b'
  } else if (!inUnitMeta.isBit && outUnitMeta.isBit) { // if input is not bit and output is bit
    valueInBytes = valueInBytes * 8; // convert to bits first if target is bits
  } else if (inUnitMeta.isBit && outUnitMeta.isBit && inUnit !== outUnit) {
    // if both are bits, but different (e.g. Kb to Mb), this case is simpler as it's direct scale
    // However, our UNITS are byte-centric for non-bit units.
    // For b to b, multiplier is 1. For b to Kb (kilobit), it's more complex with current setup.
    // Let's assume for now that 'b' means generic bits, and KB, MB etc are byte-based.
    // If outUnit is 'b', we need to ensure the targetMultiplier reflects bits.
    // This part needs refinement if direct bit-to-bit (Kb to Mb) is needed.
    // Current logic: convert input to Bytes, then Bytes to target unit (which might be bits if outUnit is 'b')
  }


  // Convert Bytes to output unit
  let convertedValue;
  if (outUnitMeta.isBit) { // If target is bits
    convertedValue = (valueInBytes * 8) / (useSI ? UNITS["B"].siMultiplier : UNITS["B"].multiplier) / (targetMultiplier * 8) ; // Convert bytes to bits, then scale by target bit unit
                                                                                                                            // This is tricky because targetMultiplier for 'b' is 1/8 (byte based)
                                                                                                                            // Let's simplify: if outUnit is 'b', valueInBytes * 8 IS the value in bits.
    convertedValue = valueInBytes * 8 / (targetMultiplier / (1/8)); // targetMultiplier for 'b' is 1/8. To get bit value, divide by (targetMultiplier_in_bytes_for_bits)
                                                                    // if outUnit is 'b', targetMultiplier is 1/8. So (1/8)/(1/8) = 1. valueInBytes * 8. Correct.
                                                                    // if outUnit was say, Kb (not a defined unit), this would be more complex.
                                                                    // Sticking to defined units:
    if (outUnit === 'b') {
        convertedValue = valueInBytes * 8;
    } else {
        // This case (e.g. outputting to Kb, Mb etc.) is not directly supported by current UNITS for bits
        // For now, if outUnit is a bit unit other than 'b', it's an issue.
        // The README only lists "b" as a bit unit.
        convertedValue = valueInBytes * 8; // Default to plain bits if outUnit is 'b'
    }
  } else {
    convertedValue = valueInBytes / targetMultiplier;
  }


  let outputString = convertedValue.toLocaleString(undefined, {
    minimumFractionDigits: 0, // Adjust as needed
    maximumFractionDigits: 2, // Adjust as needed
  });

  if (addCommas) {
    // toLocaleString with default undefined locale already adds commas based on user's locale
    // If specific formatting is needed, provide locale and options
    // Forcing comma separation if not default:
    const parts = String(convertedValue.toFixed(2)).split('.'); // Using toFixed for consistency before splitting
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    outputString = parts.join('.');
    // remove trailing .00
    if (outputString.endsWith(".00")) {
        outputString = outputString.substring(0, outputString.length - 3);
    } else if (outputString.endsWith("0") && outputString.includes(".")) {
         outputString = outputString.substring(0, outputString.length - 1);
    }

  } else {
    // Default toLocaleString might add commas. To ensure no commas:
    outputString = String(parseFloat(convertedValue.toFixed(2))); // toFixed then parseFloat to remove trailing zeros
  }


  if (suffix) {
    outputString += ` ${outUnit}`;
  }

  return <span>{outputString}</span>;
};

export default ByteConverter;

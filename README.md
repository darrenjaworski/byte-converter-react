# byte-converter-react &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/darrenjaworski/byte-converter-react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/byte-converter-react.svg?style=flat)](https://www.npmjs.com/package/byte-converter-react)

A small, type-safe React component to convert between data sizes. Supports both binary (base 1024) and SI (base 1000) units, with flexible formatting and warnings for invalid input.

## Installation

```bash
npm install byte-converter-react
```

## Quick Start

```jsx
import React from "react";
import ByteConverter from "byte-converter-react";

export default function Example() {
  return (
    <ByteConverter suffix inUnit="KB" outUnit="MB">
      1024
    </ByteConverter>
    // Renders: 1 MB
  );
}
```

## Props

| Prop         | Type          | Default | Description                                                                  |
| ------------ | ------------- | ------- | ---------------------------------------------------------------------------- |
| children     | number/string | —       | **Required.** Value to convert. Must be a positive, finite number or string. |
| hideWarnings | boolean       | false   | Suppress console warnings for invalid input.                                 |
| suffix       | boolean       | false   | Show the unit after the converted number.                                    |
| inUnit       | Unit          | "B"     | Input unit: "b", "B", "KB", "MB", "GB", "TB", "PB".                          |
| outUnit      | Unit          | "MB"    | Output unit: same as above.                                                  |
| addCommas    | boolean       | false   | Format output with locale commas (e.g., 1,000,000).                          |
| useSI        | boolean       | false   | Use SI (base 1000) instead of binary (base 1024) units.                      |

**Unit options:**

- `b` (bit), `B` (byte), `KB` (kilobyte), `MB` (megabyte), `GB` (gigabyte), `TB` (terabyte), `PB` (petabyte)

## Examples

**Convert bytes to megabytes (default):**

```jsx
<ByteConverter>1048576</ByteConverter> // Renders: 1
```

**Convert kilobytes to megabytes with suffix:**

```jsx
<ByteConverter suffix inUnit="KB" outUnit="MB">
  1024
</ByteConverter> // Renders: 1 MB
```

**Add commas for large numbers:**

```jsx
<ByteConverter addCommas inUnit="B" outUnit="B">
  1000000
</ByteConverter> // Renders: 1,000,000
```

**Use SI units (base 1000):**

```jsx
<ByteConverter inUnit="KB" outUnit="MB" useSI>
  1000
</ByteConverter> // Renders: 1
```

**Handle invalid input:**

```jsx
<ByteConverter>-1</ByteConverter> // Renders: -1 and logs a warning
<ByteConverter hideWarnings>-1</ByteConverter> // Renders: -1, no warning
```

## TypeScript Support

All props are fully typed. You can import the prop types:

```ts
import type { ByteConverterProps } from "byte-converter-react";
```

## License

MIT

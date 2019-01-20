# byte-converter-react &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/darrenjaworski/byte-converter-react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/byte-converter-react)

A small React component to convert between data sizes.

## usage

```bash
$npm install byte-converter-react
```

Available props:

- `children`, is required and must be a positive, finite, integer, string or number.
- `hideWarnings`, boolean to turn on/off warnings. `false` by default.
- `suffix`, boolean to turn on/off suffix. AKA unit written after the converted number. `false` by default.
- `inUnit`, one of ["B" (byte), "KB" (kilobyte), "MB" (megabyte), "GB" (gigabyte), "TB" (terabyte), "PB" (petabyte)]. `B` for bytes by default.
- `outUnit`, one of ["B", "KB", "MB", "GB", "TB", "PB"]. `MB` for megabytes by default.
- `addCommas`, will convert to locale string, 1,000,000 etc. `false` by default.
- `useSI`, will use decimal notation instead of binary, `false` by default.

Usage:

```js
import React from "react";

import ByteConverter from "byte-converter-react";

class App extends React.Component {
  render() {
    return (
      <ByteConverter suffix inUnit="KB" outUnit="MB">
        1024
      </ByteConverter>
    );
  }
}

export default App;
```

## upcoming features

- support for bits

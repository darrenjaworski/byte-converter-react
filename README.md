# byte-converter-react

A small React component to convert between data sizes.

## usage

```bash
$npm install byte-converter-react
```

Available props:

- children, is required and must be a positive, finite, integer.
- hideWarnings, boolean to turn on/off warnings. false by default
- inUnit, one of ["B" (byte), "KB" (kilobyte), "MB" (megabyte), "GB" (gigabyte), "TB" (terabyte), "PB" (petabyte)]. B for bytes by default.
- outUnit, one of ["B", "KB", "MB", "GB", "TB", "PB"]. B for bytes by default.

Usage:

```js
import React from "react";

import ByteConverter from "byte-converter-react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ByteConverter hideWarnings>1073741824</ByteConverter>
      </div>
    );
  }
}

export default App;
```

## upcoming features

- useSI prop (SI decimal units instead of binary notation)
- suffix prop (1 kilobyte, etc)
- formatting prop (1,000)

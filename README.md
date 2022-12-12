# @mazp/dotenv

## Introduce

This is a package about injecting data to process.env object from a .env file, made this package reason is dotenv package is unstable.

## Install

```bash
npm i @mazp/dotenv
yarn add @mazp/dotenv
```

## Usage

### Use env file inject

```bash
dotenv test.env rimraf dist
```

if you don't pass a .env file, default use that named config.env file in the root dir, that you can direct use command like follow:

```bash
dotenv rimraf dist
```

### Use parameter inject

```bash
dotenv NODE_ENV=development rimraf dist
```

## API

### dotnet(option: DotenvOption)

```ts
interface DotenvOption {
  path?: string | string[];
  command?: string[];
}
declare function dotenv(option: DotenvOption): void;
```

you can use this API, pass the path parameter inject data to process.env, path is a .env file location, if you do not pass, default use that named config.env file in the root dir.
The path parameter is a relative root dir, so you maybe use a path or url module to load the correct path.

```js
// ESM
import dotenv from "@mazp/dotenv";
dotenv({});
```

```js
// CJS
let dotenv = require("@mazp/dotenv");
dotenv({ path: "test.env" });
```

[![Release](https://github.com/asd-xiv/jest-config/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/asd-xiv/jest-config/actions/workflows/release.yml)
[![npm version](https://img.shields.io/npm/v/@asd14/jest-config.svg)](https://www.npmjs.com/package/@asd14/jest-config)

# @asd14/jest-config

> Reusable Jest configuration.

## Installation

```sh
npm install --save-dev @asd14/jest-config
```

## Usage

In your `jest.config.js` file, add the following:

```text
import baseConfig from "@asd14/jest-config"

/** @satisfies {import("jest").Config} */
export default /** @type {const} */ ({
  ...baseConfig,
  testEnvironment: "jsdom",
})
```

What `baseConfig` does:

1. Resolve `@d41/*` and `@asd14/*` monorepo packages;
2. Allow importing `*.js` extension files which are problematic since Jest
   parses `src` files and those `*.js` files might not yet be transpiled.
3. Enforce 95% coverage threshold :godmode:

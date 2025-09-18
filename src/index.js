import path from "node:path"
import { fileURLToPath } from "node:url"
import { findUpSync } from "./utils/find-up-sync.js"

const MONOREPO_ROOT = path.dirname(findUpSync("nx.json"))
const DIRNAME = path.dirname(fileURLToPath(import.meta.url))

/** @satisfies {import("@jest/types").Config.InitialOptions} */
export default /** @type {const} */ ({
  // Use SWC, the Rust based transpiler, instead of Babel
  transform: {
    "^.+\\.[jt]sx?$": "@swc/jest",
  },

  // Run files that end in .test
  testMatch: ["**/?(*.)test.[jt]s?(x)"],

  moduleNameMapper: {
    // Jest cannot resolve paths in a npm workspace packages so we need to
    // manually map them.
    // This works because the default behavior npm workspaces is to symlink
    // the packages in the root node_modules folder.
    "@d41/(.*)": `${MONOREPO_ROOT}/node_modules/@d41/$1/src`,
    "@asd14/(.*)": `${MONOREPO_ROOT}/node_modules/@asd14/$1/src`,

    // Map imports with .js extension to their TypeScript counterparts
    //
    // This is necessary because TypeScript and SWC do not alter import paths
    // and ESM requires explicit file extensions for imports. So even if we're
    // importing a .ts file, we need to specify the .js extension because that's
    // the extension of the transpiled file.
    //
    // But since Jest runs directly on source files, those .js file will not exist
    // as building has not happened yet.
    //
    // For example, it will map this import:
    //  import { findUpSync } from "./find-up-sync.js"
    // into
    //  import { findUpSync } from "./find-up-sync"
    "^(.*)\\.js$": "$1",
  },

  // Enforce a minimum test coverage
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },

  // A list of paths to modules that run some code to configure or set up
  // the testing framework before each test file in the suite is executed.
  setupFilesAfterEnv: [`${DIRNAME}/setup.js`],
})

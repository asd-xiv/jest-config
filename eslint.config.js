import {
  nodeConfig,
  nodeJestConfig,
  commonIgnores,
} from "@asd14/eslint-config/node"

const SRC_FILES = ["src/**/*.js"]
const TEST_FILES = ["src/**/*.test.ts"]
const DEV_FILES = ["eslint.config.js"]

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [...commonIgnores],
  },
  {
    ...nodeConfig,
    files: [...SRC_FILES, ...DEV_FILES, ...TEST_FILES],
  },
  {
    ...nodeJestConfig,
    files: [...TEST_FILES],
  },
]

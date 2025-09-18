import fs from "node:fs"
import path from "node:path"

/**
 * @typedef {Object} FindUpSyncOptions
 *
 * @property {string} [cwd] - The current working directory to start from.
 */

/**
 * @callback FindUpSyncFn
 *
 * @param {string} fileName - The name of the file to find.
 * @param {FindUpSyncOptions} [options] - Options for the function.
 * @returns {string} The absolute path to the file.
 */

/**
 * Find a file up the directory tree synchronously.
 *
 * @type {FindUpSyncFn}
 *
 * @throws {Error} If the starting folder does not exist.
 *
 * @throws {Error} If the file does not exist up the tree.
 *
 * @example
 *  const filePath = findUpSync("lerna.json");
 *  //=> "/Users/johndoe/Projects/WootWoot/lerna.json"
 *
 */
const findUpSync = (fileName, options = {}) => {
  let { cwd } = options
  cwd = path.resolve(cwd ?? process.cwd())

  if (!fs.statSync(cwd).isDirectory()) {
    throw new Error(`Path "${cwd}" does not exist or is not a directory`)
  }

  let { root } = path.parse(cwd)

  while (cwd !== root) {
    const file_path = path.join(cwd, fileName)

    if (fs.existsSync(file_path)) {
      return file_path
    }

    cwd = path.dirname(cwd)
    root = path.parse(cwd).root
  }

  throw new Error(`File "${fileName}" does not exist up the tree`)
}

export { findUpSync }

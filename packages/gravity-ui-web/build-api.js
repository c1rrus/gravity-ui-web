/**
 * Provides programatic access to CSS, asset and SASS file paths
 * that are published by the gravity-ui-web NPM package.
 *
 * This is so that consumers of this package can access those files
 * in their own build processes (e.g. to copy them to their build dir)
 * without needing to know the internal directory structure of this
 * package or having to hard-code file paths in their own build
 * scripts.
 *
 * @public
 */

// Note, since this file is included in the published NPM package, it
// must not export paths or filenames that are excluded from the published
// package. Refer to the 'files' section in package.json to see exactly
// what gets published and what does not.
// Any path or file data that is required for development and builds but
// is excluded from the published NPM package should be added to
// gulp/paths.js instead of this file.

const path = require('path');
const fs = require('fs');
const pkgManifest = require('./package.json');
const bldConsts = require('./build-consts.js');

const pkgDir = __dirname;

// Resolves the given path segments relative to the UI lib dist dir
function distPath(...pathSegements) {
  return path.resolve(pkgDir, bldConsts.distDirname, ...pathSegements);
}

// CSS
const distCssFileBasename = 'gravity';
const distCssFilename = `${distCssFileBasename}.css`;

const distCssDebugFileBasename = 'debug';
const distCssDebugFilename = `${distCssDebugFileBasename}.css`;

// SVG symbols
const distSvgSymbolsFilename = `${bldConsts.svgSymbolsBasename}.svg`;
const distSvgSymbolsInfoFilename = `${bldConsts.svgSymbolsBasename}.json`;

// JS
const distJsFileBasename = distCssFileBasename;
const distJsFilename = `${distJsFileBasename}.js`;

// Resolves the given path segments relative to the SASS src dir
function srcSassPath(...pathSegements) {
  return path.resolve(pkgDir, bldConsts.srcDirname, bldConsts.srcSassDirname, ...pathSegements);
}

// SASS
const srcSassMainFilename = 'index.scss';

const srcSassDebugFilename = `${distCssDebugFileBasename}.scss`;

// Expose versions of embedded copies of gravity-particles & modularscale
function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File not found
      return null;
    }

    // Other errors indicate something's actually broken
    // so throw...
    throw err;
  }
}

module.exports = {
  /**
   * The Gravity UI SASS version.
   *
   * @public
   */
  version: pkgManifest.version,

  // ==== Pre-compiled output: ====

  /**
   * Takes a sequence of path segments relative to the UI library's
   * distributables directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the UI library's distributables directory.
   *
   * @return {string} Absolute file path to the specified
   *        distributable directory or file.
   *
   * @public
   */
  distPath,

  /**
   * The filename of Gravity's pre-compiled CSS.
   *
   * @public
   */
  distCssFilename,

  /**
   * The filename of Gravity's pre-compiled debug CSS.
   *
   * @public
   */
  distCssDebugFilename,

  /**
   * The filename of Gravity's SVG symbols file.
   *
   * @public
   */
  distSvgSymbolsFilename,

  /**
   * The filename of Gravity's SVG symbols metadata JSON file.
   *
   * @public
   */
  distSvgSymbolsInfoFilename,

  /**
   * The filename of Gravity's client-side JS file.
   *
   * @public
   */
  distJsFilename,

  // ==== Published source files: ====

  /**
   * Takes a sequence of path segments relative to the UI library's
   * SASS source directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the UI library's SASS source directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   *
   * @public
   */
  srcSassPath,

  /**
   * The filename of Gravity's main SASS source file.
   *
   * @public
   */
  srcSassMainFilename,

  /**
   * The filename of Gravity's debug SASS source file.
   *
   * @public
   */
  srcSassDebugFilename,

  /**
   * Returns the version number of the embedded copy of the
   * `@buildit/gravity-particles` package.
   *
   * @return {string | null} The SemVer version string, or `null`
   *          if the embedded copy of this package is not available.
   *
   * @public
   */
  gravityParticlesCopyVersion() {
    const versionInfo = readJson(
      srcSassPath(
        bldConsts.srcLibCopyDirname,
        bldConsts.gravityParticlesDirname,
        bldConsts.versionFilename,
      ),
    );
    if (versionInfo) {
      return versionInfo.version;
    }
    return null;
  },

  /**
   * Returns the version number of the embedded copy of the
   * `modularscale-sass` package.
   *
   * @return {string | null} The SemVer version string, or `null`
   *          if the embedded copy of this package is not available.
   *
   * @public
   */
  modularscaleCopyVersion() {
    const versionInfo = readJson(
      srcSassPath(
        bldConsts.srcLibCopyDirname,
        bldConsts.modularscaleDirname,
        bldConsts.versionFilename,
      ),
    );
    if (versionInfo) {
      return versionInfo.version;
    }
    return null;
  },
};

import fileToUrl from 'file-url'

// adapted from https://nodejs.org/api/path.html#path_path_resolve_paths
const CHAR_FORWARD_SLASH = '/'
const percentRegEx = /%/g
// const backslashRegEx = /\\/g
const newlineRegEx = /\n/g
const carriageReturnRegEx = /\r/g
const tabRegEx = /\t/g

export default (filepath, cwd) => {
  let resolved
  if (filepath.startsWith('./')) filepath = filepath.slice(2)
  if (filepath.startsWith('/')) resolved = filepath
  else resolved = (cwd || '') + '/' + filepath

  // path.resolve strips trailing slashes so we must add them back
  const filePathLast = filepath.charCodeAt(filepath.length - 1)
  if ((filePathLast === CHAR_FORWARD_SLASH) &&
      resolved[resolved.length - 1] !== '/') { resolved += '/' }
  const outURL = new URL('file://')
  if (resolved.includes('%')) { resolved = resolved.replace(percentRegEx, '%25') }
  // In posix, "/" is a valid character in paths
  // if (resolved.includes('\\')) { resolved = resolved.replace(backslashRegEx, '%5C') }
  if (resolved.includes('\n')) { resolved = resolved.replace(newlineRegEx, '%0A') }
  if (resolved.includes('\r')) { resolved = resolved.replace(carriageReturnRegEx, '%0D') }
  if (resolved.includes('\t')) { resolved = resolved.replace(tabRegEx, '%09') }
  outURL.pathname = resolved

  console.log('__resolved__', resolved)
  console.log('__what__', fileToUrl(resolved))
  return outURL
}

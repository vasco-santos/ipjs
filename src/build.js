import packager from './package/index.js'
import { resolve } from 'path'

const run = async opts => {
  if (opts.args && opts.args.length) {
    opts.cwd = resolve(opts.args.shift())
    if (opts.args.length) {
      opts.dist = resolve(opts.args.shift())
      if (opts.args.length) throw new Error('Too many arguments')
    }
  }
  if (opts.onConsole) {
    const print = key => f => opts.onConsole(key, f.url.toString())
    opts.hooks = {
      onParse: print('parsing'),
      onParsed: print('parsed'),
      onDeflateStart: print('deflating'),
      onDeflateEnd: print('deflated')
    }
  }
  console.log('__IPJS__1')
  const pkg = await packager(opts)
  console.log('__IPJS__2')
  await pkg.parsed
  console.log('__IPJS__3')
  const dist = opts.dist || resolve('dist')
  console.log('__IPJS__4')
  await pkg.deflate(dist)
  console.log('__IPJS__5')
  pkg.dist = dist
  return pkg
}
run.schema = {
  tests: false,
  main: false
}

export default run

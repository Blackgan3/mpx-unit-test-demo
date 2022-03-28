const { CachedInputFileSystem, ResolverFactory } = require('enhanced-resolve')
const fs = require('fs')
const path = require('path')
const AddModePlugin = require('@mpxjs/webpack-plugin/lib/resolver/AddModePlugin')
// const AddEnvPlugin = require('@mpxjs/mpx-jest/packages/mpx2-jest/webpack-plugin/resolver/AddEnvPlugin')

// 一筹莫展的时候发现了
module.exports = (reqPath, options) => {
  if (reqPath.includes('?resolve')) {
    return path.resolve('./test/customResolverDefault.js')
  }
  let request = reqPath.replace('?resolve', '')
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  const addModePlugin = new AddModePlugin('before-file', 'wx', {
    include: () => true
  }, 'file')
  // const addEnvPlugin = new AddEnvPlugin('before-file', this.options.env, this.options.fileConditionRules, 'file')

  // create a resolver
  const myResolver = ResolverFactory.createResolver({
    // Typical usage will consume the `fs` + `CachedInputFileSystem`, which wraps Node.js `fs` to add caching.
    fileSystem: new CachedInputFileSystem(fs, 4000),
    ...options,
    useSyncFileSystemCalls: true,
    plugins: [addModePlugin]
    /* any other resolver options here. Options/defaults can be seen below */
  })
  let result = myResolver.resolveSync({}, options.basedir, request)
  let realPath = result.split('?')[0]
  if (realPath) {
    realPath = fs.realpathSync(realPath)
  }
  return realPath
}

module.exports = function (raw, filename, options) {
  return new Promise((resolve, reject) => {
    var path = require('@node/path')
    var less = require('@node/less')

    var opts = Object.assign({
      filename: path.basename(filePath)
    }, options.less)

    // provide import path
    var dir = path.dirname(filePath)
    var paths = [dir, process.cwd()]
    opts.paths = opts.paths
      ? opts.paths.concat(paths)
      : paths

    less.render(raw, opts, (err, res) => {
      if (err) {
        return reject(err)
      }
      // Less 2.0 returns an object instead rendered string
      if (typeof res === 'object') {
        res = res.css
      }
      resolve(res)
    })
  })
}
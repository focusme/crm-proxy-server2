const pkg = require('../package.json')
module.exports = {
  "name"        : pkg.name,
  "script"      : "./app.js",
  "watch"       : false,
  "env": {
      "NODE_ENV": "production"
  }
}

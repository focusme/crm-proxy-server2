const pkg = require('../package.json')

var isHome = false
if (process.argv.includes('--home')) {
   isHome = true
}
module.exports ={
  "name"        : pkg.name,
  "max_memory_restart": "300M",
  "script"      : "./src/app.js",
  "watch"       : true,
  "ignore_watch" : ["node_modules", "*.md","*.json",'pm2'],
  "output ":"./logs/out.log",
  "env": {
      "NODE_ENV": isHome ? 'home' : "development"
  }
}

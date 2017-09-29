const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
const cp = require('child_process')

function run(callback) {
  return new Promise((resolve, reject)=>{
    webpack(webpackConfig).watch({
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ["node_modules", "*.md","*.json",'pm2','build/'],
    }, (err, stats) => {

      if (err) {
        console.log(err);
        reject();
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      resolve()
      callback();
    });
  })
}
let server;


// 启动项目
run(()=>{
  function onStdOut(data) {
    const time = new Date().toTimeString();

    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);
  }
  if (server) {
    server.kill('SIGTERM');
  }
  server = cp.spawn('node', ['./build/app.js']);
  // log
  server.stdout.on('data', onStdOut);
  server.stderr.on('data', x => { process.stderr.write(x)});
}).then(()=>{
   console.log('=============  start success  ============');
}).catch((err) => {
  console.log(err);
})

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

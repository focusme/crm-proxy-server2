const webpack = require('webpack');
const {
  nodeConfig,
  serverConfig,
  clientConfig
} = require('./webpack.config');
const path = require('path');
const cp = require('child_process')

// webpack(serverConfig).watch({
//   aggregateTimeout: 300,
//   poll: 1000,
//   ignored: ["node_modules", "*.md","*.json",'pm2','build/'],
// }, (err, stats) => {
//
//   if (err) {
//     console.log(err);
//   }
//   function onStdOut(data) {
//     const time = new Date().toTimeString();
//
//     process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
//     process.stdout.write(data);
//   }
//   if (server) {
//     server.kill('SIGTERM');
//   }
//   server = cp.spawn('node', ['./build/app.js']);
//   // log
//   server.stdout.on('data', onStdOut);
//   server.stderr.on('data', x => { process.stderr.write(x)});
//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
//   }) + '\n\n')
// });
//
// webpack(clientConfig).watch({
//   aggregateTimeout: 300,
//   poll: 1000,
//   ignored: ["node_modules", "*.md","*.json",'pm2','build/'],
// }, (err, stats) => {
//
//   if (err) {
//     console.log(err);
//   }
//   function onStdOut(data) {
//     const time = new Date().toTimeString();
//
//     process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
//     process.stdout.write(data);
//   }
//   if (server) {
//     server.kill('SIGTERM');
//   }
//   server = cp.spawn('node', ['./build/app.js']);
//   // log
//   server.stdout.on('data', onStdOut);
//   server.stderr.on('data', x => { process.stderr.write(x)});
//
//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
//   }) + '\n\n')
// });


// 启动服务
let server;
// 回调重启服务
// const callback = () => {
//   if (server) {
//     server.kill('SIGTERM');
//   }
//   server = cp.spawn('node', ['./build/app.js']);
//   server.stdout.on('data', (data) => {
//     const time = new Date().toTimeString();
//     process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
//     process.stdout.write(data);
//   });
//   server.stderr.on('data', x => {
//     process.stderr.write(x)
//   });
// }

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});


function watch() {
  let compiler = new webpack(nodeConfig);

  const callback = (err, stats) => {
    if (err) {
      console.log(err);
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  };

  let watching = compiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ["node_modules", "*.md", "*.json", 'pm2', 'build/'],
  }, callback);

  compiler.plugin("watch-run", function (compilation,next) {
    console.log(1231231313,next)
    next();
  });
  compiler.plugin('done', (stats) => {
    console.info(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }));
  });
  // compiler.plugin("failed", function (compilation, callback) {
  //   console.log('failed');
  // });
  compiler.plugin("invalid", (stats) => {
    console.log('invalid');
    console.info(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }));
  });

}


// function run(callback) {
//   return new Promise((resolve, reject) => {
//     webpack(nodeConfig).watch({
//       aggregateTimeout: 300,
//       poll: 1000,
//       ignored: ["node_modules", "*.md", "*.json", 'pm2', 'build/'],
//     }, (err, stats) => {
//
//       if (err) {
//         console.log(err);
//         reject();
//       }
//       process.stdout.write(stats.toString({
//         colors: true,
//         modules: false,
//         children: false,
//         chunks: false,
//         chunkModules: false
//       }) + '\n\n')
//
//       resolve()
//       callback();
//     });
//   })
// }

watch();

// // 启动项目
// run(callback).then(() => {
//   console.log('=============  start success  ============');
// }).catch((err) => {
//   console.log(err);
// })

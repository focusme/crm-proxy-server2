
const {
  nodeConfig,
  serverConfig,
  clientConfig
} = require('./webpack.config');

const {
  watch,
  format,
  cleanFile
} = require('kin-toolkits').tools


const path = require('path');
const cp = require('child_process')
const rimraf = require('rimraf')

// 启动服务
let server,flag = false;

// 回调重启服务
const restart = () => {
  if (server) {
    server.kill('SIGTERM');
  }
  server = cp.spawn('node', ['./build/app.js']);
  server.stdout.on('data', (data) => {
    const time = new Date().toTimeString();
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);
  });
  server.stderr.on('data', x => {
    process.stderr.write(x)
  });
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

const run = async ()=>{
  await watch(clientConfig,()=>{
    console.log('build client success');
  },async ()=>{
    // 删除文件
    await cleanFile('build/chunks/*')
  })
  await watch(serverConfig,()=>{
    console.log('build server success');
  })
  await watch(nodeConfig,()=>{
    flag = true
    console.log('build node success');
    restart();
  })

}

cleanFile('build/*').then((value) => {
  run()
})

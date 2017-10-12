const {
  build,
  format
} = require('kin-toolkits').tools

const {
  nodeConfig,
  serverConfig,
  clientConfig
} = require('./webpack.config');

async function run() {
  console.log(`${format(new Date())}  start build \n`);

  await build(serverConfig)

  await build(clientConfig).then(() => {
    console.log('client build success !\n\n');
  }).catch((err) => {
    console.log('client', err);
  })

  await build(nodeConfig).then(() => {
    console.log('node build success !\n');
  }).catch((err) => {
    console.log('node', err);
  })

  console.log(`${format(new Date())}  Finished build`);
}

run()

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const ora = require('ora')

const format = require('./lib/format.js')

console.log(`${format(new Date())}  start build`);

const spinner = ora('building...')
spinner.start()
webpack(webpackConfig).run((err, stats) => {
  spinner.stop()
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

  console.log(`${format(new Date())}  Finished build`);
});

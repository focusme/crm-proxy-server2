const {
  format,
  cleanFile
} = require('kin-toolkits').tools

async function clean() {
  console.log(`${format(new Date())}  start remove`);
  await Promise.all([
    cleanFile('build/*'),
  ]);
  console.log(`${format(new Date())}  Finished remove`);
}

clean()

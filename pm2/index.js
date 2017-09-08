var pm2 = require('pm2');

const config = require(`./config.${process.env.NODE_ENV || 'development'}`)
pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.start(config, function(err, apps) {
    pm2.disconnect();
    if (err) throw err
  });
});


// The one that is always fetching data from Sources and inserting in Mongo
var fetcher = require('./fetcher-cmc');
// var pot = require('./pot');
var cron = require('node-cron');

// hardcode for now
// var url = 'mongodb://localhost:27017/bamboo';

// get BTC from BCM
var getBTC = function() {
  console.log('lululul');
  fetcher.getSnap('bitcoin').then(function(json) {
    console.log('========== Fetch BTC price from BCM ============');
    console.log(json);
  });
};
console.log('lalala');
cron.schedule('*/5 * * * * *', getBTC);

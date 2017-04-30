/*
  robot.js
  a script that's being called from a cronjob, and fetches 
  coins data, passing to a mongodb storage
 */

var fetcher = require('./fetcher-cmc');
var moment = require('moment');
var _ = require('lodash');
var mongo = require('mongo-db');
var step;

// 1 - get the time id
var timeofday = moment().format('YYYY-MM-DDTHH:mm:00Z');

// 2 - fetch 
step = fetcher.getSnap().then(function(res) {
  var data = _.map(res, function(coin) {
    coin.date = timeofday;
    return coin;
  });
  return data;
});

// save to db
step.then(function(data) {
  var conn = {
    database: 'bamboo',
    collection: 'coins',
    user: 'bamboo',
    password: '',
    host: 'localhost',
    port: 27017
  };
  var urlconn = 'mongodb://' + conn.host + ':' +
    conn.port + '/' + conn.database;
  var db = new mongo(urlconn, conn.collection, true);
  // next step, insert into them
});
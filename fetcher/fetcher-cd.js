
// fetcher-cd.js
// This is the one that gets the data from Coindesk
// This only can gets Bitcoin prices
/*
  Usage:
  var fetcher = require('fetcher-cd');

  // Gets BTC snap for current date from URL, USD default
  var btcSnap = fetcher.getSnap();

  // Gets BTC snap for current date from URL, EUR based
  var btcSnapEUR = fetcher.getSnap('EUR');

  // Gets all BTC historic prices (daily), USD default
  var btcHistoric = fetcher.getHistoric();

  // Gets BTC historic prices for a specified time stamp, USD default
  var btcHistoric = fetcher.getHistoric('01-01-2012', '12-31-2012');

  // Gets BTC historic prices for a specified time stamp, EUR based
  var btcHistoric = fetcher.getHistoric('01-01-2012', '12-31-2012', 'EUR');

 */
var fetcher = exports;
var fetch = require('node-fetch');
var check = require('check-types');

// hardcode, because this is an API gateway
var masterUrl = 'http://api.coindesk.com/v1/bpi/';

fetcher.getSnap = function(coinid) {
  var url = masterUrl + 'currentprice.json';
  if (check.nonEmptyString(coinid)) {
    url = masterUrl + 'currentprice/' + coinid + '.json';
  }
  return fetch(url).then(function(res) {
    return res.json();
  })
};

fetcher.getHistoric = function(from, to, currency) {
  var url = masterUrl + 'historical/close.json';
  if (check.nonEmptyString(from) && check.nonEmptyString(to)) {
    url += '?start=' + from + '&end=' + to;
  }
  if (check.nonEmptyString(currency)) {
    url += '&currency=' + currency;
  }
  return fetch(url).then(function(res) {
    return res.json();
  });
};



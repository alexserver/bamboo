// fetcher-cmc.js
// This is the one that gets the data from Coinmarketcap

/*
  Usage:
  var fetcher = require('fetcher-cmc');

  // Gets all coins snap for current date from URL
  var allCoinsSnap = fetcher.getSnap();

  // Gets one coin snap for current date from URL
  var btcSnap = fetcher.getSnap('bitcoin');
  //or
  var btcSnap = fetcher.getSnap('BTC');

  // Gets global market stats
  var globalStats = fetcher.getGlobal();

  // Gets a lookup list of coin symbol and Coinmarketcap IDs
  var dictionary = fetcher.getCoinCache();
 */

var fetcher = exports;
var fetch = require('node-fetch');
var check = require('check-types');

// hardcode, because this is an API gateway
var masterUrl = 'https://api.coinmarketcap.com/v1/';

fetcher.getSnap = function(coinid) {
  var url = masterUrl + 'ticker/';
  if (check.nonEmptyString(coinid)) {
    url += coinid + '/';
  }
  return fetch(url).then(function(res) {
    return res.json();
  });
};

fetcher.getGlobal = function() {
  var url = masterUrl + 'global/';
}
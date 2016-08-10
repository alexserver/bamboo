var fetcherCd = require('./fetcher-cd');
var fetcherCmc = require('./fetcher-cmc');


//fetch current
fetcherCd.getSnap().then(function(json) {
  console.log('========= Fetch current from CD ============');
  console.log(json);
});

//fetch some historic
fetcherCd.getHistoric('2012-01-01', '2012-01-10').then(function(json) {
  console.log('========== Fetch history for 2012 Jan in USD from CD =============');
  console.log(json);
});

// get BTC from BCM
fetcherCmc.getSnap('bitcoin').then(function(json) {
  console.log('========== Fetch BTC price from BCM ============');
  console.log(json);
});
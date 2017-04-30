/*
  Mongo Promise v0.0.1

  var pot = require('pot')(url);
  var docs = [
    {name: 'John'},
    {name: 'Steve'},
    {name: 'Clark'}
  ];

  pot.open().then(function(db) {
    db.insert('collection', docs).then(function(result) {
      console.log(result);
    }).then(function(){
      return db.get({name: 'Clark'});
    }).then(function(rows) {
      console.log(rows);
    });;
  });
*/

var mongo = require('mongodb');
var when = require('when');

module.exports = function(url) {
  var master = {};
  var result = {};

  master.insert = function(collection, docs) {
    var db = this.db;
    var promise = when.promise(function(resolve, reject) {
      db.collection(collection).insert(docs, function(err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    return promise;
  };

  master.get = function(collection, query) {
    var db = this.db;
    var promise = when.promise(function(resolve, reject) {
      db.collection(collection).find(query).toArray(function(err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    return promise;
  };

  result.open = function() {
    var promise = when.promise(function(resolve, reject) {
      mongo.connect(url, function(err, db) {
        if (err) {
          return reject(err);
        }
        master.db = db;
        return master;
      });
    });
    return promise;
  };

  return result;
};

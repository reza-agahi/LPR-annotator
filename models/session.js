var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://192.168.12.212:27017/LPR-annotator';

exports.getSession = function(id, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('sessions');
    collection.find({'_id': id}).toArray(function(err, sessions) {
      var session = sessions[0];
      assert.equal(err, null);
      callback(session);
      db.close();
    });
  });
}

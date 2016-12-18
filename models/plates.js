var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var objectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://192.168.29.85:27017/LPR-annotator';

exports.insertPlate = function(plate) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // Get the documents collection
    var collection = db.collection('plates');
    // Insert some documents
    collection.insert(plate, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Inserted a plate document into the plates collection");
      db.close();
    });

  });
}

exports.insertPlateBatch = function(plates) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // Get the documents collection
    var collection = db.collection('plates');
    // Insert some documents
    collection.insertMany(plates, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted plate documents into the plates collection");
      db.close();
    });

  });
}

exports.updatePlate = function(query, update, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.warn("Connected correctly to server");

    var collection = db.collection('plates');
    collection.update(query, update, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the plate document");
      callback();
      db.close();
    });

  });
}

exports.getFirstPlate = function(query, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find(query).sort({_id:1}).toArray(function(err, docs) {
      if (docs.length === 0) {
        collection.find({state: 'annotated'}).sort({_id:1}).toArray(function(err, docs) {
          var doc = docs[0];
          assert.equal(err, null);
          console.log("Found the following record");
          console.dir(doc);
          collection.updateOne({'_id': new objectId(doc._id)}, { $set: { state : 'checking' } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("change document state: initial -> checking");
            callback(doc);
            db.close();
          });
        })
      } else {
        var doc = docs[0];
        assert.equal(err, null);
        console.log("Found the following record");
        console.dir(doc);
        collection.updateOne({'_id': new objectId(doc._id)}, { $set: { state : 'checking' } }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("change document state: initial -> checking");
          callback(doc);
          db.close();
        });
      }
    });

  });
}

exports.getNextPlate = function(query, currentPlateId, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({$or: [query, {_id: new objectId(currentPlateId)} ] }).sort({_id:1}).toArray(function(err, docs) {
      var doc;
      for (var i = 0; i < docs.length; i++) {
        if (docs[i]._id == currentPlateId) {
          doc = docs[i + 1] || docs[0];
          break;
        }
      }
      assert.equal(err, null);
      console.log("Found the following record");
      console.dir(doc);
      collection.updateOne({'_id': new objectId(doc._id)}, { $set: { state : 'checking' } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("change document state: initial -> checking");
        callback(doc);
        db.close();
      });
    });

  });
}

exports.getPreviousPlate = function(query, currentPlateId, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({$or: [query, {_id: new objectId(currentPlateId)} ] }).sort({_id:1}).toArray(function(err, docs) {
      var doc;
      for (var i = 0; i < docs.length; i++) {
        if (docs[i]._id == currentPlateId) {
          doc = docs[i - 1] || docs[docs.length - 1];
          break;
        }
      }
      assert.equal(err, null);
      console.log("Found the following record");
      console.dir(doc);
      collection.updateOne({'_id': new objectId(doc._id)}, { $set: { state : 'checking' } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("change document state: initial -> checking");
        callback(doc);
        db.close();
      });
    });

  });
}

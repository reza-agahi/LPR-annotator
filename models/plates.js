var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var objectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://192.168.12.22:27017/LPR-annotator';

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

exports.getIthPlate = function(i, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    var j = Number(i) + 100; // 100 is maxNumOfCheckingPlate
    collection.find({}).sort({_id:1}).limit(j).toArray(function(err, docs) {
      if (docs.length === 0 || i > docs.length || i < 1) {
        collection.find({annotated: true}).sort({_id:1}).toArray(function(err, docs) {
          var doc = docs[0];
          assert.equal(err, null);
          console.log("Found the following record");
          console.dir(doc);
          collection.updateOne({'_id': new objectId(doc._id)}, { $set: { checking : true } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("change document checking: false -> true");
            callback(doc);
            db.close();
          });
        })
      } else {
        while (docs[i - 1].checking === true) {
          i++;
        }
        var doc = docs[i - 1];
        assert.equal(err, null);
        console.log("Found the following record");
        console.dir(doc);
        collection.updateOne({'_id': new objectId(doc._id)}, { $set: { checking : true } }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("change document checking: false -> true");
          callback(doc);
          db.close();
        });
      }
    });

  });
}

exports.getFirstPlate = function(callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({ $and: [{annotated: false}, {checking: false}] }).sort({_id:1}).limit(1).toArray(function(err, docs) {
      if (docs.length === 0) {
        collection.find({annotated: true}).sort({_id:1}).toArray(function(err, docs) {
          var doc = docs[0];
          assert.equal(err, null);
          console.log("Found the following record");
          console.dir(doc);
          collection.updateOne({'_id': new objectId(doc._id)}, { $set: { checking : true } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("change document checking: false -> true");
            callback(doc);
            db.close();
          });
        })
      } else {
        var doc = docs[0];
        assert.equal(err, null);
        console.log("Found the following record");
        console.dir(doc);
        collection.updateOne({'_id': new objectId(doc._id)}, { $set: { checking : true } }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("change document checking: false -> true");
          callback(doc);
          db.close();
        });
      }
    });

  });
}

exports.getNextPlate = function(doUpdate, currentPlateId, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({$and: [{checking: false}, {_id: {$gt: new objectId(currentPlateId)} }] })
              .sort({_id:1}).limit(1).toArray(function(err, docs) {
      var doc = docs[0];
      // for (var i = 0; i < docs.length; i++) {
      //   if (docs[i]._id == currentPlateId) {
      //     doc = docs[i + 1] || docs[0];
      //     break;
      //   }
      // }
      assert.equal(err, null);
        if (docs.length !== 0 ) { // TODO: temporary error handling! change it soon!
          console.log("Found the following record");
          console.dir(doc);
          collection.updateOne({'_id': new objectId(doc._id)}, { $set: { checking : true } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("change document checking: false -> true");
            callback(doc);
            db.close();
          });
        } else {
          collection.find({'_id': new objectId(currentPlateId)}).toArray(function(err, docs) {
            assert.equal(err, null);
            var doc = docs[0];
            console.log("Found the following record");
            console.dir(doc);
            callback(doc);
            db.close();
          });
        }
    });

  });
}

exports.getPreviousPlate = function(doUpdate, currentPlateId, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({$and: [{checking: false}, {_id: {$lt: objectId(currentPlateId)} }] }).sort({_id:-1}).limit(1).toArray(function(err, docs) {
      var doc = docs[0];
      // for (var i = 0; i < docs.length; i++) {
      //   if (docs[i]._id == currentPlateId) {
      //     doc = docs[i - 1] || docs[docs.length - 1];
      //     break;
      //   }
      // }
      assert.equal(err, null);
        if (docs.length !== 0) { // TODO: temporary error handling! change it soon!
          console.log("Found the following record");
          console.dir(doc);
          collection.updateOne({'_id': new objectId(doc._id)}, { $set: { checking : true } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("change document checking: false -> true");
            callback(doc);
            db.close();
          });
        } else {
          collection.find({'_id': new objectId(currentPlateId)}).toArray(function(err, docs) {
            assert.equal(err, null);
            var doc = docs[0];
            console.log("Found the following record");
            console.dir(doc);
            callback(doc);
            db.close();
          });
        }


      });
  });
}

exports.numberOfAnnotatedPlates = function(callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({annotated: true}).count(function (e, count) {
      return callback(e, count);
    });

  });
}

exports.getNumberOfPlate = function(currentPlateId, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find({_id: {$lt: objectId(currentPlateId)} }).count(function (e, count) {
      return callback(e, count);
    });

  });
}



exports.stats = function(callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    var stats = [];
    collection.distinct('annotator', function (err, annotators) {
      for (var i = 0; i < annotators.length; i++) {
        var annotatorStat = {};
        if (annotators[i] !== null) {
          annotatorStat.name = annotators[i];
          // numberOfAnnotations
          // annotationsPerMin
          stats.push(annotatorStat);
        }
      }
      return callback(err, stats);
    });

  });
}

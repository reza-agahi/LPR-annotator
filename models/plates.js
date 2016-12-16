var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var objectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://localhost:27017/LPR-annotator';

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

var validatedIndex = function(index, isNext, docs) {
  if (index >= docs.length) {
    index = 0;
  } else if (index < 0) {
    index = docs.length-1;
  }
  if(isNext) {
    while(docs[index].state === 'checking'){
      index++;
      if (index >= docs.length) {
        index = 0;
      }
    }
  } else {
    while(docs[index].state === 'checking'){
      index--;
      if (index < 0) {
        index = docs.length-1;
      }
    }
  }
  return index;
}

exports.getPlate = function(query, index, isNext, callback) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('plates');
    collection.find(query).sort({_id:1}).toArray(function(err, docs) {
      index = validatedIndex(index, isNext, docs);
      var doc = docs[index];
      assert.equal(err, null);
      console.log("Found the following record");
      console.dir(doc);
      collection.updateOne({'_id': new objectId(doc._id)}, { $set: { state : 'checking' } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("change document state: initial -> checking");
        callback(doc, index);
        db.close();
      });
    });

  });
}

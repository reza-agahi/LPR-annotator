var bcrypt = require('bcrypt');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'LPR-annotator'
  }
});

var records = [];
knex.select().table('users').then(function(result) {
  records = result;
});

exports.findById = function(id, done) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      done(null, records[idx]);
    } else {
      done(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, done) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return done(null, record);
      }
    }
    return done(null, null);
  });
}

exports.checkPassword = function(username, password) {
  var hashedPassword = "";
  for (var i = 0; i < records.length; i++) {
    if (records[i].username == username) {
      hashedPassword = records[i].password;
      return bcrypt.compareSync(password, hashedPassword);
    }
  }
  return false;
}

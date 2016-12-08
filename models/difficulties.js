var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '1421371',
    database : 'LPR-annotator'
  }
});

exports.difficultiesInfo = function() {
    return knex.select('name').table('difficulties');
}

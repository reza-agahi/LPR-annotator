var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '1421371',
    database : 'LPR-annotator'
  }
});

knex.schema.createTableIfNotExists('difficulties', function(table) {
  table.increments('id').primary();
  table.string('name', 50);
})
.createTableIfNotExists('types', function(table) {
  table.increments('id').primary();
  table.string('name', 50);
})
.createTableIfNotExists('plates', function(table) {
  table.increments('id').primary();
  table.integer('difficultyId').unsigned().references('difficulties.id');
  table.integer('typeId').unsigned().references('types.id');
  table.string('imageName', 50);
  table.boolean('isChecked');
})
.createTableIfNotExists('boxes', function(table) {
  table.increments('id').primary();
  table.integer('plateId').unsigned().references('plates.id');
  table.integer('x').unsigned();
  table.integer('y').unsigned();
  table.integer('w').unsigned();
  table.integer('h').unsigned();
})
.catch(function(e) {
  console.error(e);
});

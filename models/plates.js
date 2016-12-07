var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '1421371',
    database : 'LPR-annotator'
  }
});

exports.plateInfo = function() {
    return knex.select(['plates.id', 'difficulties.name as difficulty', 'types.name as type', 'plates.imageName'])
    .from('plates', 'difficulties', 'types')
    .innerJoin('difficulties', 'difficulties.id', 'plates.difficultyId')
    .innerJoin('types', 'types.id', 'plates.typeId')
    .where({ isChecked: 0 });
}

exports.boxesInfo = function(plateId) {
    return knex.select('id', 'characters', 'x', 'y', 'w', 'h').table('boxes').where({ plateId: plateId });
}

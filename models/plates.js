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
    return knex.select(['plates.id', 'difficulties.name as difficulty',
                        'types.name as type', 'plates.imageName', 'plates.isAnnotatable',
                        'plates.isChecked'])
    .from('plates', 'difficulties', 'types')
    .innerJoin('difficulties', 'difficulties.id', 'plates.difficultyId')
    .innerJoin('types', 'types.id', 'plates.typeId')
    .where({ isChecked: 0 });
}

exports.boxesInfo = function(plateId) {
    return knex.select('id', 'characters', 'x', 'y', 'w', 'h').table('boxes').where({ plateId: plateId });
}

exports.updatePlateInfo = function(plate, typeId, difficultyId) {
  return knex('plates')
  .where({id: plate.id})
  .update({
    difficultyId: difficultyId,
    typeId: typeId,
    isChecked: Number(plate.isChecked),
    isAnnotatable: Number(plate.isAnnotatable)
  });
}

exports.updateBoxesInfo = function(boxes) {
  var chunkSize = boxes.length;
  return knex.batchInsert('boxes', boxes, chunkSize);
}

exports.getTypeId = function(typeName) {
  return knex.select(['types.id'])
  .from('types')
  .where({ name: typeName });
}

exports.getDifficultiesId = function(difficultyName) {
  return knex.select(['difficulties.id'])
  .from('difficulties')
  .where({ name: difficultyName });
}

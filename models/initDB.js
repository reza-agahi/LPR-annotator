// var bcrypt = require('bcrypt');
// const saltRounds = 10;
//
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : 'localhost',
//     user : 'root',
//     password : '1421371',
//     database : 'LPR-annotator'
//   }
// });
//
// knex.schema.createTableIfNotExists('difficulties', function(table) {
//   table.increments('id').primary();
//   table.string('name', 50);
// })
// .createTableIfNotExists('types', function(table) {
//   table.increments('id').primary();
//   table.string('name', 50);
// })
// .createTableIfNotExists('plates', function(table) {
//   table.increments('id').primary();
//   table.integer('difficultyId').unsigned().references('difficulties.id');
//   table.integer('typeId').unsigned().references('types.id');
//   table.string('imageName', 50);
//   table.boolean('isChecked');
//   table.boolean('isAnnotatable');
// })
// .createTableIfNotExists('boxes', function(table) {
//   table.increments('id').primary();
//   table.integer('plateId').unsigned().references('plates.id');
//   table.string('characters', 3);
//   table.integer('x').unsigned();
//   table.integer('y').unsigned();
//   table.integer('w').unsigned();
//   table.integer('h').unsigned();
// })
// .createTableIfNotExists('users', function(table) {
//   table.increments('id').primary();
//   table.string('username', 20);
//   table.string('password', 256);
// })
// .then(function() {
//   return knex.insert({username: 'reza.agahi', password: bcrypt.hashSync('123456', saltRounds)}).into('users');
// })
// .catch(function(e) {
//   console.error(e);
// });

var platesModel = require('../models/plates.js');

var types = [
  {
    name: "خودروهای شخصی",
    image: "./assets/images/samplePlate.png"
  },
  {
    name: "نوع دو",
    image: "./assets/images/samplePlate.png"
  }
];
var difficulties = [
  "معمولی",
  "دشوار"
];
var box1 = {
  symbol: "5",
  x: 213,
  y: 45,
  w: 93,
  h: 93
}
var box2 = {
  symbol: "3",
  x: 13,
  y: 5,
  w: 93,
  h: 93
}


var plateObject1 = {
  type: types[0],
  difficulty: difficulties[0],
  image: "./assets/images/sampleTruePlate.jpg",
  isChecked: false,
  isAnnotatable: true,
  boxes: [
    box1,
    box2
  ]
}

var plateObject2 = {
  type: types[1],
  difficulty: difficulties[1],
  image: "./assets/images/sampleTruePlate2.jpg",
  isChecked: false,
  isAnnotatable: true,
  boxes: [
    box1,
    box2
  ]
}

platesModel.insertPlateBatch([plateObject1, plateObject2]);

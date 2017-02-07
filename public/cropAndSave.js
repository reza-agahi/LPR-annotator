fs = require('fs');

var plates = JSON.parse(fs.readFileSync('plates.json', 'utf8'));

cropPlateFunction = function cropPlateFunction(plate) {
  // console.log(plate.image);
  Jimp = require("jimp");
  if (plate.annotated == true) {
    //	console.log(plate.image);
    Jimp.read(plate.image, function(err, image) {
      if (err) {
        // console.log("error in reading ", err);
        return;
      }
      cropAndSaveDigit = function cropAndSaveDigit(box, index) {

        var folderName = "TrainingPatches";
        if (fs.existsSync(folderName) == false)
          fs.mkdirSync(folderName);
        if (fs.existsSync(folderName + "/" + box.symbol) == false)
          fs.mkdirSync(folderName + "/" + box.symbol);
        //if(typeof cropped != 'undefined')
        //image.clone().crop(parseInt(box.x), parseInt(box.y), parseInt(box.w), parseInt(box.h)).write('./'+folderName + '/' + box.symbol + "/" + plate.image.substring(0,-4)+'_'+index+'.jpg');
        var n = plate.image.lastIndexOf('/');
        var imageAddress = ('./' + folderName + '/' + box.symbol + "/" + plate.image.substring(n + 1).slice(0, -4) + '_' + index + ".png");

        image.clone().crop(parseInt(box.x), parseInt(box.y), parseInt(box.w), parseInt(box.h)).write(imageAddress);

      }
      plate.boxes.forEach(cropAndSaveDigit);
    });
  }
};

var chunkSize = 500;
var i =13;
// plates.slice((i * chunkSize), (i*chunkSize) + chunkSize).forEach(cropPlateFunction);
console.log("asdasd");
// for (var i = 0; i < Math.floor(plates.length / chunkSize) ; i++) {
//   console.log(i);
//   plates.slice((i * chunkSize), (i*chunkSize) + chunkSize).forEach(cropPlateFunction);
// }
//
if (plates.length % chunkSize !== 0) {
  plates.slice(-(plates.length % chunkSize), -1).forEach(cropPlateFunction);
}

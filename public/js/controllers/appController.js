var app = angular.module("app");

app.controller("appController", function($scope, getInfo, updateInfo) {
  $scope.difficultiesInfo = [];
  $scope.typesInfo = [];
  $scope.plateInfo = [];
  $scope.currentPlate = [];
  $scope.currentBox = [];
  $scope.init = function () {
    var blockContextMenu, myElement;

    blockContextMenu = function (evt) {
      evt.preventDefault();
    };

    myElement = document.querySelector('#canvas');
    myElement.addEventListener('contextmenu', blockContextMenu);
  }
  $scope.init();
  $scope.canvas = new fabric.Canvas('canvas');
  $scope.canvas.observe('mouse:down', function(e) { $scope.mousedown(e); });
  $scope.canvas.observe('mouse:move', function(e) { $scope.mousemove(e); });
  $scope.canvas.observe('mouse:up', function(e) { $scope.mouseup(e); });

  $scope.started = false;
  $scope.stateAdd = false;
  $scope.x1 = 0;
  $scope.y1 = 0;
  $scope.x2 = 0;
  $scope.y2 = 0;

  /* Mousedown */
$scope.mousedown = function(e) {
  var mouse = $scope.canvas.getPointer(e.e);
  $scope.started = true;
  $scope.x1 = mouse.x;
  $scope.y1 = mouse.y;

  if ($scope.stateAdd === false && $scope.canvas.getActiveObject() !== null) {
    $scope.currentBox = $scope.getCurrentActiveBox($scope.currentPlate.boxes);
  }
}

$scope.getCurrentActiveBox = function(boxes) {
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].x == $scope.canvas.getActiveObject().get('left') &&
        boxes[i].y == $scope.canvas.getActiveObject().get('top')) {
          return boxes[i];
    }
  }
};

$scope.setDimensionsOfCurrentActiveBox = function(box) {
  box.x = $scope.canvas.getActiveObject().get('left');
  box.y = $scope.canvas.getActiveObject().get('top');
  box.w = $scope.canvas.getActiveObject().get('cacheWidth');
  box.h = $scope.canvas.getActiveObject().get('cacheHeight');
};

// $scope.setCurrentActiveBoxCharacters = function(characters) {
//   $scope.currentBox
// };

/* Mousemove */
$scope.mousemove = function mousemove(e) {
    if(!$scope.started) {
        return false;
    }
    var mouse = $scope.canvas.getPointer(e.e);
    $scope.x2 = mouse.x;
    $scope.y2 = mouse.y;
}

$scope.mouseup = function mouseup(e) {
    if($scope.started) {
        $scope.started = false;
    }

    if ($scope.stateAdd === true) {
      var w = Math.abs($scope.x1 - $scope.x2);
      var h = Math.abs($scope.y1 - $scope.y2);

      $scope.mouseMoved = false;
      if (!w || !h) {
          return false;
      }

      var y;
      if ($scope.y1 < $scope.y2) {
        y = Math.round($scope.y1);
      } else {
        y = Math.round($scope.y2);
      }

      var x;
      if ($scope.x1 < $scope.x2) {
        x = Math.round($scope.x1);
      } else {
        x = Math.round($scope.x2);
      }

      var rect = new fabric.Rect({
        top : y ,
        left : x,
        width : w,
        height : h,
        fill : '',
        stroke: 'white',
        strokeWidth: 3
      });

        $scope.currentPlate.boxes.push({id: -1, characters: -1, x: x, y: y, w: w, h: h});

        $scope.canvas.add(rect);
        $scope.canvas.renderAll();
        $scope.stateAdd = false;
    }
    if ($scope.stateAdd === false && $scope.canvas.getActiveObject() !== null) {
      $scope.setDimensionsOfCurrentActiveBox($scope.currentBox);
    }
    $scope.orderBoxes($scope.currentPlate.boxes);

    if ($scope.canvas.getActiveObject() !== null) {
      var indexOfSelectedBox = $scope.indexOfActiveBox();
      $(".plate-t1 :input")[indexOfSelectedBox].focus();
    }

    $scope.$apply();
}

  $scope.next = function() {
    $scope.currentPlate.plate.isChecked = true;
    updateInfo.plateInfo($scope.currentPlate).then(function success(response) {
      console.log(response.data);
    }, function failure(error) {
      alert("there are some problems in updating the plate data");
    });

    getInfo.nextPlateInfo().then(function success(response) {
      $scope.canvas.clear();
      $scope.plateInfo = JSON.parse(response.data);
      $scope.currentPlate = $scope.plateInfo;
      $scope.orderBoxes($scope.currentPlate.boxes);
      $scope.plateZeroOneToBoolean($scope.currentPlate.plate);
      $scope.boxesCharactersToNumber($scope.currentPlate.boxes);
      // TODO: this will be change later for supporting multiple plates loading
      $scope.addBoxes($scope.plateInfo.boxes);
      $scope.setImage('canvas-background', $scope.currentPlate.plate.imageName);
      console.log($scope.plateInfo);
    }, function failure(error) {
      alert("there are some problems in loading the plate data");
    });
  };

  $scope.keyPress = function(e) {
    if(e.which === 39) { // ->
      $scope.next();
    } else if (e.which === 37) { // <-
      $scope.previous();
    } else if (e.which === 65) { // a
      $scope.stateAdd = true;
    } else if (e.which === 68) { // d
      $scope.removeRect();
    }
  };

  $scope.previous = function() {
    $scope.currentPlate.plate.isChecked = true;
    updateInfo.plateInfo($scope.currentPlate).then(function success(response) {
      console.log(response.data);
    }, function failure(error) {
      alert("there are some problems in updating the plate data");
    });

    getInfo.previousPlateInfo().then(function success(response) {
      $scope.canvas.clear();
      $scope.plateInfo = JSON.parse(response.data);
      $scope.currentPlate = $scope.plateInfo;
      $scope.orderBoxes($scope.currentPlate.boxes);
      $scope.plateZeroOneToBoolean($scope.currentPlate.plate);
      $scope.boxesCharactersToNumber($scope.currentPlate.boxes);
      // TODO: this will be change later for supporting multiple plates loading
      $scope.addBoxes($scope.plateInfo.boxes);
      $scope.setImage('canvas-background', $scope.currentPlate.plate.imageName);
      console.log($scope.plateInfo);
    }, function failure(error) {
      alert("there are some problems in loading the plate data");
    });
  };

  $scope.indexOfActiveBox = function() {
    for (var i = 0; i < $scope.currentPlate.boxes.length; i++) {
      if($scope.currentPlate.boxes[i].x == $scope.canvas.getActiveObject().get('left') &&
          $scope.currentPlate.boxes[i].y == $scope.canvas.getActiveObject().get('top'))
          return i;
    }
  }

  $scope.removeRect = function() {
    $scope.currentPlate.boxes.splice($scope.indexOfActiveBox(), 1);
    $scope.canvas.getActiveObject().remove();
  };

  $scope.addBoxes = function(boxes) {
    for (var i = 0; i < boxes.length; i++) {
      var rect = new fabric.Rect({
        top : boxes[i].y ,
        left : boxes[i].x,
        width : boxes[i].w,
        height : boxes[i].h,
        fill : '',
        stroke: 'white',
        strokeWidth: 3
      });
      $scope.canvas.add(rect);
      $scope.canvas.renderAll();
    }
  };

  $scope.orderBoxes = function(boxes) {
    return boxes.sort($scope.boxSort);
  }

  $scope.boxSort = function (a,b) {
    if (a.x < b.x)
      return -1;
    if (a.x > b.x)
      return 1;
    return 0;
  }

  $scope.boxesCharactersToNumber = function(boxes) {
    for (var i = 0; i < boxes.length; i++) {
      if(Number(boxes[i].characters) == boxes[i].characters) {
        boxes[i].characters = Number(boxes[i].characters);
      }
    }
  }

  $scope.plateZeroOneToBoolean = function (plate) {
    for (var key in plate) {
      if (plate.hasOwnProperty(key) && (key === "isAnnotatable" || key === "isChecked")) {
        if (plate[key] == false) {
          plate[key] = false;
        } else if (plate[key] == true) {
          plate[key] = true;
        }
      }
    }
  }

  $scope.setImage = function(id, imageUrl) {
    $('#' + id).css('background-image', 'url(' + imageUrl + ')');
  };

  getInfo.plateInfo().then(function success(response) {
    $scope.plateInfo = JSON.parse(response.data);
    $scope.currentPlate = $scope.plateInfo;
    $scope.orderBoxes($scope.currentPlate.boxes);
    $scope.plateZeroOneToBoolean($scope.currentPlate.plate);
    $scope.boxesCharactersToNumber($scope.currentPlate.boxes);
    // TODO: this will be change later for supporting multiple plates loading
    $scope.addBoxes($scope.plateInfo.boxes);
    $scope.setImage('canvas-background', $scope.currentPlate.plate.imageName);
    console.log($scope.plateInfo);
  }, function failure(error) {
    alert("there are some problems in loading the plate data");
  });

  getInfo.typesInfo().then(function success(response) {
    $scope.typesInfo = JSON.parse(response.data);
  }, function failure(error) {
    alert("there are some problems in loading the types data");
  });

  getInfo.difficultiesInfo().then(function success(response) {
    $scope.difficultiesInfo = JSON.parse(response.data);
  }, function failure(error) {
    alert("there are some problems in loading the difficulties data");
  });

});

var app = angular.module("app");

app.controller("appController", function($scope) {
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
}

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

        $scope.canvas.add(rect);
        var square = $scope.canvas.getActiveObject();
        $scope.canvas.renderAll();
        $scope.stateAdd = false;
    }
}

  $scope.next = function() {
    console.log("next");
  };

  $scope.keyPress = function(e) {
    console.log(e.which);
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
    console.log("previous");
  };

  $scope.removeRect = function() {
    $scope.canvas.getActiveObject().remove();
  };

});

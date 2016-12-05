var app = angular.module("app");

app.controller("appController", function($scope) {
  $scope.canvas = new fabric.Canvas('canvas');

  $scope.next = function() {
    console.log("next");
  };

  $scope.keyPress = function(e) {
    if(e.which === 39) {
      $scope.next();
    } else if (e.which === 37) {
      $scope.previous();
    }
  };

  $scope.previous = function() {
    console.log("previous");
  };


  $scope.addRect = function() {
    var rect = new fabric.Rect({
      top : 0,
      left : 0,
      width : 60,
      height : 70,
      fill : '',
      stroke: 'white',
      strokeWidth: 3
    });
    $scope.canvas.add(rect);
  };
  $scope.removeRect = function() {
    $scope.canvas.getActiveObject().remove();
  };

  $scope.rightClick = function(e) {
    console.log(e.which);
  };

});

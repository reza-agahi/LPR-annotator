var app = angular.module("app");

app.controller("appController", function($scope, $window, getInfo, updateInfo) {
    $scope.difficultiesInfo = [];
    $scope.typesInfo = [];
    $scope.currentPlate = [];
    $scope.selectedBox = [];
    $scope.currentPlateScaleX = 1;
    $scope.currentPlateScaleY = 1;
    $scope.updateIsAllowed = false;
    $scope.stats = [];

    $scope.canvas = new fabric.Canvas('canvas');

    $scope.canvas.observe('mouse:down', function(e) {
        $scope.mousedown(e);
    });
    $scope.canvas.observe('mouse:move', function(e) {
        $scope.mousemove(e);
    });
    $scope.canvas.observe('mouse:up', function(e) {
        $scope.mouseup(e);
    });

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
            $scope.selectedBox = $scope.getCurrentActiveBox($scope.currentPlate.boxes);
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

    /* Mousemove */
    $scope.mousemove = function mousemove(e) {
        if ($scope.started === false) {
            return false;
        }
        var mouse = $scope.canvas.getPointer(e.e);
        $scope.x2 = mouse.x;
        $scope.y2 = mouse.y;
    }

    $scope.mouseup = function mouseup(e) {
        if ($scope.started === true) {
            $scope.started = false;
        }

        if ($scope.stateAdd === true) {
            var w = Math.abs($scope.x1 - $scope.x2);
            var h = Math.abs($scope.y1 - $scope.y2);

            var y = $scope.y1 < $scope.y2 ? $scope.y1 : $scope.y2;
            var x = $scope.x1 < $scope.x2 ? $scope.x1 : $scope.x2;

            var rect = new fabric.Rect({
                top: y,
                left: x,
                width: w,
                height: h,
                fill: '',
                stroke: 'red',
                strokeWidth: 3
            });

            $scope.currentPlate.boxes.push({
                symbol: undefined,
                x: x,
                y: y,
                w: w,
                h: h
            });

            $scope.canvas.add(rect);
            $scope.canvas.renderAll();
            $scope.stateAdd = false;
        }
        // update dimension of selected box after resizing
        if ($scope.stateAdd === false && $scope.canvas.getActiveObject() !== null) {
            $scope.canvas.renderAll();
            $scope.setDimensionsOfCurrentActiveBox($scope.selectedBox);
            var indexOfSelectedBox = $scope.indexOfActiveBox();
            $(".plate-t1 :input")[indexOfSelectedBox].focus();
        }

        // order boxes based on their x
        $scope.orderBoxes($scope.currentPlate.boxes);
        $scope.$apply();
    }


    $scope.boxDimensionsMultiplication = function(scaleX, scaleY) {
        for (var i = 0; i < $scope.currentPlate.boxes.length; i++) {
            $scope.currentPlate.boxes[i].x = $scope.currentPlate.boxes[i].x * scaleX;
            $scope.currentPlate.boxes[i].y = $scope.currentPlate.boxes[i].y * scaleY;
            $scope.currentPlate.boxes[i].w = $scope.currentPlate.boxes[i].w * scaleX;
            $scope.currentPlate.boxes[i].h = $scope.currentPlate.boxes[i].h * scaleY;
        }
    }

    $scope.boxDimensionsDivision = function(scaleX, scaleY) {
        for (var i = 0; i < $scope.currentPlate.boxes.length; i++) {
            $scope.currentPlate.boxes[i].x = $scope.currentPlate.boxes[i].x / scaleX;
            $scope.currentPlate.boxes[i].y = $scope.currentPlate.boxes[i].y / scaleY;
            $scope.currentPlate.boxes[i].w = $scope.currentPlate.boxes[i].w / scaleX;
            $scope.currentPlate.boxes[i].h = $scope.currentPlate.boxes[i].h / scaleY;
        }
    }

    $scope.keyPress = function(e) {
        if (e.which === 39) { // ->
            $scope.next();
        } else if (e.which === 37) { // <-
            $scope.previous();
        } else if (e.ctrlKey && e.altKey) { // ctrl + alt
            $scope.stateAdd = true;
        } else if (e.which === 46 && e.ctrlKey) { // delete All
          $scope.removeAllRect();
        } else if (e.which === 46) { // delete
          $scope.removeRect();
        } else if (e.which === 13) { // confirm
          if ($scope.currentPlate.annotated === false) {
            $scope.currentPlate.annotated = true;
            setTimeout(function(){
              $scope.next();
            }, 500);
          }
        } else if (e.which === 71 && e.ctrlKey) {
          e.preventDefault();
          var plateNumber = prompt("Please enter plateNumebr");
          $scope.goTo(plateNumber);
        }
    }


    $scope.indexOfActiveBox = function() {
        for (var i = 0; i < $scope.currentPlate.boxes.length; i++) {
            if ($scope.currentPlate.boxes[i].x == $scope.canvas.getActiveObject().get('left') &&
                $scope.currentPlate.boxes[i].y == $scope.canvas.getActiveObject().get('top'))
                return i;
        }
    }

    $scope.removeRect = function() {
        $scope.currentPlate.boxes.splice($scope.indexOfActiveBox(), 1);
        if ($scope.canvas.getActiveObject() !== null) {
          $scope.canvas.getActiveObject().remove();
        }
    };

    $scope.removeAllRect = function() {
      $scope.canvas.setActiveGroup(new fabric.Group($scope.canvas.getObjects())).renderAll();
      if($scope.canvas.getActiveGroup()){
        $scope.currentPlate.boxes = [];
          $scope.canvas.getActiveGroup().forEachObject(function(o){
          $scope.canvas.remove(o);
        });
        $scope.canvas.discardActiveGroup().renderAll();
      }

    };

    $scope.addBoxes = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            var rect = new fabric.Rect({
                top: boxes[i].y,
                left: boxes[i].x,
                width: boxes[i].w,
                height: boxes[i].h,
                fill: '',
                stroke: 'red',
                strokeWidth: 3
            });
            $scope.canvas.add(rect);
            $scope.canvas.renderAll();
        }
    };

    $scope.orderBoxes = function(boxes) {
        return boxes.sort($scope.boxSort);
    }

    // helper function for sorting boxes
    $scope.boxSort = function(a, b) {
        if (a.x <= b.x)
            return -1;
        if (a.x > b.x)
            return 1;
    }

    $scope.boxesSymbolToNumber = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (Number(boxes[i].symbol) == boxes[i].symbol) {
                boxes[i].symbol = Number(boxes[i].symbol);
            }
        }
    }

    // fetch and update plates info
    $scope.fetchPlate = function(plate) {
        $scope.currentPlate = JSON.parse(plate);
        var img = new Image();
        img.onload = function() {
            $scope.orderBoxes($scope.currentPlate.boxes);
            $scope.boxesSymbolToNumber($scope.currentPlate.boxes);
            $scope.currentPlateScaleX = $scope.canvas.width / this.width;
            $scope.currentPlateScaleY = $scope.canvas.height / this.height;
            $scope.boxDimensionsMultiplication($scope.currentPlateScaleX, $scope.currentPlateScaleY);
            $scope.addBoxes($scope.currentPlate.boxes);
            $scope.canvas.setBackgroundImage($scope.currentPlate.image, $scope.canvas.renderAll.bind($scope.canvas), {
                width: $scope.canvas.width,
                height: $scope.canvas.height,
                // Needed to position backgroundImage at 0/0
                originX: 'left',
                originY: 'top'
            });
            $scope.updateIsAllowed = true;
        }
        img.src = $scope.currentPlate.image;
    }

    $scope.updatePlate = function() {
        $scope.boxDimensionsDivision($scope.currentPlateScaleX, $scope.currentPlateScaleY);
        updateInfo.plateInfo($scope.currentPlate).then(function success(response) {
            console.log(response.data);
        }, function failure(error) {
            alert("there are some problems in updating the plate data");
        });
        getInfo.numberOfAnnotatedPlates().then(function success(response) {
            $scope.numberOfAnnotatedPlates = response.data.numberOfAnnotatedPlates;
        }, function failure(error) {
            alert("there are some problems in getting the numberOfAnnotatedPlates data");
        });
    }

    angular.element(document).ready(function () {
      getInfo.numberOfAnnotatedPlates().then(function success(response) {
        $scope.numberOfAnnotatedPlates = response.data.numberOfAnnotatedPlates;
      }, function failure(error) {
        alert("there are some problems in loading the numberOfAnnotatedPlates");
      });
      getInfo.plateInfo({}).then(function success(response) {
        $scope.fetchPlate(response.data);
        getInfo.numberOfPlate().then(function success(response) {
          $scope.numberOfPlate = response.data.numberOfPlate + 1;
        }, function failure(error) {
          alert("there are some problems in getting the numberOfPlate data");
        });
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
      $scope.$apply();
    });

    $scope.next = function() {
      if($scope.updateIsAllowed === true) { // just update when currentPlate is fully loaded
        $scope.updatePlate();
        getInfo.nextPlateInfo({}).then(function success(response) {
            $scope.canvas.clear();
            $scope.fetchPlate(response.data);
            setTimeout(function(){ $scope.$apply(); }, 100);
            setTimeout(function(){
              getInfo.numberOfPlate().then(function success(response) {
                  $scope.numberOfPlate = response.data.numberOfPlate + 1;
              }, function failure(error) {
                  alert("there are some problems in getting the numberOfPlate data");
              });
              $scope.$apply();
            }, 100);
        }, function failure(error) {
            alert("there are some problems in loading the plate data");
        });
      }
      $scope.updateIsAllowed = false;
    };

    $scope.previous = function() {
      if($scope.updateIsAllowed === true) { // just update when currentPlate is fully loaded
        $scope.updatePlate();
        getInfo.previousPlateInfo({}).then(function success(response) {
            $scope.canvas.clear();
            $scope.fetchPlate(response.data);
            setTimeout(function(){ $scope.$apply(); }, 100);
            setTimeout(function(){
              getInfo.numberOfPlate().then(function success(response) {
                  $scope.numberOfPlate = response.data.numberOfPlate + 1;
              }, function failure(error) {
                  alert("there are some problems in getting the numberOfPlate data");
              });
              $scope.$apply();
            }, 100);
        }, function failure(error) {
            alert("there are some problems in loading the plate data");
        });
      }
      $scope.updateIsAllowed = false;
    };

    $scope.goTo = function(i) {
        $scope.updatePlate();
        getInfo.gotoPlate(i).then(function success(response) {
            $scope.canvas.clear();
            $scope.fetchPlate(response.data);
            setTimeout(function(){ $scope.$apply(); }, 100);
            setTimeout(function(){
              getInfo.numberOfPlate().then(function success(response) {
                  $scope.numberOfPlate = response.data.numberOfPlate + 1;
              }, function failure(error) {
                  alert("there are some problems in getting the ith plate");
              });
              $scope.$apply();
            }, 100);
        }, function failure(error) {
            alert("there are some problems in loading the plate data");
        });
    };

    $scope.showHelpModal = function () {
      document.getElementById('help-modal').style.display='block';
    }

    $scope.showStatModal = function () {
      getInfo.stats().then(function success(response) {
          $scope.stats = response.data.stats;
      }, function failure(error) {
          alert("there are some problems in loading the plate data");
      });
      document.getElementById('stat-modal').style.display='block';
    }

});

app.factory("updateInfo", function($http) {

  return {
    plateInfo: function(data) {
      return $http({method: 'put', url: '/updatePlateInfo', data: data});  //1. this returns promise
    }
  };

});

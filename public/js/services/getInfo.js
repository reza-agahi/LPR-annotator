app.factory("getInfo", function($http) {

  return {
    plateInfo: function(justInitialPlate) {
      return $http({method: 'post', url: '/plateInfo', data: justInitialPlate});  //1. this returns promise
    },
    nextPlateInfo: function(justInitialPlate) {
      return $http({method: 'post', url: '/plateInfo/next', data: justInitialPlate});
    },
    previousPlateInfo: function(justInitialPlate) {
      return $http({method: 'post', url: '/plateInfo/previous', data: justInitialPlate});
    },
    difficultiesInfo: function() {
      return $http({method: 'post', url: '/difficultiesInfo'});
    },
    typesInfo: function() {
      return $http({method: 'post', url: '/typesInfo'});
    },
    numberOfAnnotatedPlates: function(data) {
      return $http({method: 'post', url: '/numberOfAnnotatedPlates'});  //1. this returns promise
    },
    numberOfPlate: function(data) {
      return $http({method: 'post', url: '/numberOfPlate'});
    }

  };

});

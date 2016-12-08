app.factory("getInfo", function($http) {

  return {
    plateInfo: function() {
      return $http({method: 'post', url: '/plateInfo'});  //1. this returns promise
    },
    nextPlateInfo: function() {
      return $http({method: 'post', url: '/plateInfo/next'});
    },
    previousPlateInfo: function() {
      return $http({method: 'post', url: '/plateInfo/previous'});
    },
    typesInfo: function() {
      return $http({method: 'post', url: '/typesInfo'});
    },
    difficultiesInfo: function() {
      return $http({method: 'post', url: '/difficultiesInfo'});
    },

  };

});

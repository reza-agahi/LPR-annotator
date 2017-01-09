app.factory("getInfo", function($http) {

  return {
    plateInfo: function() {
      return $http({method: 'post', url: '/plateInfo'});
    },
    nextPlateInfo: function() {
      return $http({method: 'post', url: '/plateInfo/next'});
    },
    previousPlateInfo: function() {
      return $http({method: 'post', url: '/plateInfo/previous'});
    },
    difficultiesInfo: function() {
      return $http({method: 'post', url: '/difficultiesInfo'});
    },
    typesInfo: function() {
      return $http({method: 'post', url: '/typesInfo'});
    },
    numberOfAnnotatedPlates: function(data) {
      return $http({method: 'post', url: '/numberOfAnnotatedPlates'});
    },
    numberOfPlate: function(data) {
      return $http({method: 'post', url: '/numberOfPlate'});
    }

  };

});

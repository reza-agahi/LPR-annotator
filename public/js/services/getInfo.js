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
    },
    gotoPlate: function(i) {
      return $http({method: 'post', url: '/plateInfo/ith', data: {number: i} });
    },
    stats: function() {
      return $http({method: 'post', url: '/stats'});
    }

  };

});

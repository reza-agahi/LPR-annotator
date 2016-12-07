app.factory("getInfo", function($http) {

  return {
    platesInfo: function() {
      return $http({method: 'post', url: '/platesInfo'});  //1. this returns promise
    }
  };

});

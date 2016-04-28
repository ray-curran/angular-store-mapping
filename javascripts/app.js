var app = angular.module('locations', ['angular.filter', 'uiGmapgoogle-maps'])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

.controller('MainCtrl', function($scope, sevens, $filter) {

  $scope.selectedStores = [];

  $scope.map = { center: { latitude: 39.0997, longitude: -94.5786 }, zoom: 4 };

  $scope.countSelected = 0;

  sevens.success(function(data) {
    $scope.sevens = data;
    $scope.unselectedStores = data;
    $scope.unselectedStores.forEach(function(location) { location.icon = 'http://www.googlemapsmarkers.com/v1/d3d3d3/'})
  })

  $scope.countem = function() {
    $scope.selectedStores = $scope.sevens.filter(function(location){ return location.checkVal });
    $scope.unselectedStores = $scope.sevens.filter(function(location){ return !location.checkVal });
    if($scope.selectedStores) {
      $scope.countSelected = $scope.selectedStores.length
    }
  }

  $scope.deselectAll = function() {
    $scope.sevens.forEach(function(element) {
      element.checkVal = false;
    })
    $scope.countem();
  }

  $scope.selectAll = function(state) {
    var matches
    if(state) {
      matches = $scope.sevens.filter(function(location) {return state === location.state});
    } else {
      matches = $scope.sevens
    };
    matches.forEach(function(element) {
      element.checkVal = true;
    })
    $scope.countem();
  }
})


.factory('sevens', ['$http', function($http) {
  return $http.get('locations.json')
  .success(function(data){
    return data;
  })
  .error(function(error){
    return error;
  })
}])
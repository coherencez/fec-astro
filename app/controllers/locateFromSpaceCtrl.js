'use strict'
app.controller('locateFromSpaceCtrl', ['$scope','locateFromSpaceFactory', function($scope, lfs) {

  $scope.inputBool = true;
  $scope.weatherData = null;

  $scope.getWeather = () => {
    $scope.inputBool = false;
    wf.getCurrentWeather($scope.zip, $scope.unitOfMeasure)
      .then((result) => {
        console.log('current weather',result)
        $scope.weatherData = result;
      })
      .catch((err) => {console.error(err)})
  };

}]);

'use strict';

app.controller('defaultCtrl', ['$scope', '$route', 'dataFactory', function($scope, $route, df) {
  $scope.arr = [];

  $scope.makeArray = (data) => {
    angular.forEach(data, (v, k) => {
      $scope.arr.push(v);
    });
    $scope.rndPicture();
  };

  $scope.rndPicture = () => {
    let rndIndex = df.rndNum(0, $scope.arr.length - 1);
    $scope.splashPic = $scope.arr[rndIndex];
    console.log($scope.splashPic);
  };



  df.getPictures($scope.makeArray);
}]);

'use strict';

app.controller('factCtrl', ['$scope', 'POTDfactory', function($scope, df) {
  $scope.factObj = null;

  df.getFOTD()
    .then((data) => {
      let factArray = [];
      angular.forEach(data, (v, i) => {
        factArray.push(v);
      });
      $scope.factObj = factArray[df.rndNum(0, (factArray.length - 1))];
  });
}]);

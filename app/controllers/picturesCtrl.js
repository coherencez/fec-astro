'use strict';

app.controller('picturesCtrl', ['$scope', 'picturesFactory', function($scope, pf) {

  // pf.clearArrays();
  // pf.getRandomDates();
  // angular.forEach(pf.dateArray, (v, i) => {
  //   pf.getPicsForFirebase(v)
  //     .then(data => pf.fillImgArray(data))
  // });
  // setTimeout(() => {
  //   angular.forEach(pf.imgArray, (v,i) => {
  //     pf.addToPictureList(v);
  //   })
  // }, 1000);

  $scope.pictures = [];
  $scope.logData = data => {
    $scope.pictures = data;
    angular.forEach($scope.pictures, (v,i) => {
      console.log(v.url);
    });
  };
  pf.getPictures($scope.logData);


}]);

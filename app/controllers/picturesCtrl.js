'use strict';

app.controller('picturesCtrl', ['$scope', 'picturesFactory', '$window', function($scope, pf, $window) {
  $scope.pictures = null;
// add 10 random photos to firebase DB
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

  $scope.populateDom = (data) => {$scope.pictures = pf.assignId(data)};
  
  pf.getPictures($scope.populateDom);

  $scope.clicky = url => {$window.open(url)};

}]);

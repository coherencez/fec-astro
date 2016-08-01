'use strict';

app.controller('picturesCtrl', ['$scope', 'picturesFactory', '$window', function($scope, pf, $window) {
  // required for slick init-onload option
  $scope.pictures = null;

// add 10 random photos to firebase DB from NASA APOD
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

  // set $scope.pictures to pics loaded from firebase after getting a uid
  $scope.populateDom = (data) => {$scope.pictures = pf.assignId(data)};
  // get pictures from firebase db
  pf.getPictures($scope.populateDom);
  // open HD link in new window
  $scope.clicky = url => {$window.open(url)};

}]);

'use strict';

app.controller('picturesCtrl', ['$scope', 'picturesFactory', function($scope, pf) {

  pf.clearArrays();
  pf.getRandomDates();
  angular.forEach(pf.dateArray, (v, i) => {
    pf.getPicsForPicView(v)
      .then(data => pf.fillImgArray(data))
  });
  setTimeout(() => {
    angular.forEach(pf.imgArray, (v,i) => {
      pf.addToPictureList(v);
    })
  }, 1000);

  // pf.clearArrays();
  // pf.getRandomDates();
  // angular.forEach(pf.dateArray, (v, i) => {
  //   pf.getPicsForPicView(v)
  //     .then(data => {
  //       pf.fillImgArray(data);
  //       $scope.pictures = pf.imgArray;
  //     })
  // });

}]);

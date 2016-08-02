'use strict';

app.controller('defaultCtrl', ['$scope', '$route', '$window', 'POTDfactory', function($scope, $route, $window, df) {
// trying to add POTD to firebase and then return that back down incase of 500 internal service error from NASA
  // currently just loads POTD straight from NASA
  $scope.splashPic = null;
  df.getPOTD().then(data => {
    // df.addPOTD(data);
    $scope.splashPic = data;
      // .then((fbData) => {
      //   df.getPOTDfromFB(fbData.key)
      //     .then(data => {
      //       console.log('potd from fb:', data.val().url)
      //       $scope.splashPic = data.val();
      //     });
      // });
  });
  $scope.clicky = url => {$window.open(url)};
}]);

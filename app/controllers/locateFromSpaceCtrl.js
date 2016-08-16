'use strict'
app.controller('locateFromSpaceCtrl', ['$scope','locateFromSpaceFactory', '$window', function($scope, lfs, $window) {
// get todays date, and format it for api call
  const date = new Date();
  let month = date.getMonth() + 1;
      month = month.toString();
  if(month.length == 1) {
    month = '0' + month;
  }
  const dateArr = date.toString().split(' ');
  const formattedDate = `${dateArr[3]}-${month}-${dateArr[2]}`;

  $scope.inputBool = true;
  $scope.spaceImg = null;

  $scope.getImgFromSpace = () => {
    $scope.inputBool = false;
    lfs.getLongLat($scope.zip)
      .then((result) => {
        let lat = result.coord.lat,
            lon = result.coord.lon;
        lfs.getImgFromSpace(lon, lat, formattedDate)
        .then((result) => {
          console.log(result);
          $scope.spaceImg = result;
        })
        .catch((err) => {console.log(err)})
      })
      .catch((err) => {console.error(err)})
  };

}]);

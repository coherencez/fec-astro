'use strict';

app.controller('picturesCtrl', ['$scope', 'picturesFactory', '$window', 'authFactory', 'profileFactory', function($scope, pf, $window, af, proFac) {
  // required for slick init-onload option
  $scope.pictures = null;
  $scope.numOfPics = 25;

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
  // }, 500);
// end random photos block

  // set $scope.pictures to pics loaded from firebase after getting a uid assigned
  $scope.populateDom = (data) => {$scope.pictures = pf.assignId(data)};
  // get pictures from firebase db
  pf.getPictures($scope.populateDom);
  // open HD link in new window
  $scope.clicky = url => {$window.open(url)};

  $scope.createUserFavObj = (fbId, $event) => {
      $event.stopPropagation();
      proFac.getPictureObj(fbId)
      .then( (result) => {
        // assign each fav obj UID and unique key value for reference later
        let newObj = result.val();
            newObj.uid = af.getUser();
            newObj.picKey = fbId;
        if(newObj.uid !== null) {
          proFac.addToFavoritesList(newObj);
          console.log('new picture:', newObj, 'loaded to user:', newObj.uid, '\'s profile');
        }
      });
  };
// code for description drop-down like favorites list
  // $scope.dropDown = function (e) {
  //     let $favImg = $(e.currentTarget.parentNode.parentNode.parentNode.children[0]),
  //         $buttonGroup = $(e.currentTarget.parentNode.parentNode.parentNode.children[2]);
  //     // $('.expander-trigger').toggleClass('expander-hidden');
  //     $(e.currentTarget).toggleClass('expander-hidden');
  //     $favImg.toggleClass('hidden');
  //     $buttonGroup.toggleClass('hidden');
  // };

}]);

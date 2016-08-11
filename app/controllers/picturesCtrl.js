'use strict';

app.controller('picturesCtrl', ['$scope', 'picturesFactory', '$window', 'authFactory', 'profileFactory', '$route', function($scope, pf, $window, af, proFac, $route) {
  // required for slick init-onload option
  $scope.pictures = null;
  $scope.numOfPics = 24;

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
  $scope.populateDom = (data) => {
    let picArray = pf.assignId(data),
        rndIndArray = pf.rndIndexValues( 0, (picArray.length - 1), $scope.numOfPics),
        finalPicArray = [];
    angular.forEach(rndIndArray, (v, i) => {
      finalPicArray.push( picArray[v] );
    });
    $scope.pictures = finalPicArray;
  };
  // get pictures from firebase db
  pf.getPictures($scope.populateDom);
  // open HD link in new window
  $scope.clicky = url => {$window.open(url)};

  $scope.createUserFavObj = (fbId, $event) => {
      $event.stopPropagation();
      if (af.userState()) {
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
    } else {
      alert('Please login or sign up for this functionality!');
    }
  };

  $scope.showInfoCard = function (e) {
    e.stopPropagation();
    $(e.path[3].children[4]).toggleClass('hidden');
  };

  $scope.reload = () => {$route.reload()};

}]);

'use strict';

app.controller('profileCtrl', ['$scope','profileFactory', 'authFactory', '$window', '$location', function($scope, proFac, af, $window, $location) {
  const userid = af.getUser();
  const objRef = af.getUserObjRef();
  $scope.profPic = null;

  const date = new Date().toString();
  $scope.dateArr = date.split(' '); // split date string into array for nice formatting in DOM

  $scope.loadProfilePic = (data) => {
    console.log('prof pic loaded:', data)
    $scope.profPic = data;
    // casuing $digest in prog error
    $location.url('/profile');
    $scope.$apply();
    // $route.reload // causes an infinite loop
  };
  proFac.getProfile($scope.loadProfilePic, objRef)

  $scope.dropDown = function (e) {
      let $favImg = $(e.currentTarget.parentNode.parentNode.parentNode.children[0]),
          $buttonGroup = $(e.currentTarget.parentNode.parentNode.parentNode.children[2]);
      // $('.expander-trigger').toggleClass('expander-hidden');
      $(e.currentTarget).toggleClass('expander-hidden');
      $favImg.toggleClass('hidden');
      $buttonGroup.toggleClass('hidden');
  };

  $scope.loadDataArray = (data) => {
    let favoritesList = proFac.assignFavId(data);
    $scope.favorites = [];
    angular.forEach(favoritesList, (v, k) => {
      $scope.favorites.push(v);
    })
  };
  proFac.getFavorites($scope.loadDataArray, userid);

  $scope.hdUrl = (url) => {
    $window.open(url);
  };

  $scope.deleteFavorite = (favId) => {
    proFac.deleteFromFavorites(favId);
    console.log('deleted img:', favId);
  };

  $scope.setProfilePic = (picid) => {
    proFac.getFromFav(picid)
    .then((result) => {
      let returnObj = result.val(),
          newObj = {};
      newObj.url = returnObj.url;
      newObj.picKey = returnObj.picKey;
      newObj.favid = picid;
      if (objRef !== null) proFac.addToProfile(newObj, objRef);
    });
  };

// data scraping attempt
  // $scope.logEvents = (data) => {console.log('hello',data)};
  // proFac.getEvents($scope.logEvents, $scope.logEvents);

// sun and moon phases
  proFac.getSunMoonPhases()
    .then((data) => {
      let phasesArr = [];
      $scope.events = [];
      // console.log('sun and moon phases:',data);
      angular.forEach(data.sundata, (v, i) => {
        phasesArr.push(v);
      })
      angular.forEach(data.moondata, (v, i) => {
        phasesArr.push(v);
      })
      $scope.events = phasesArr.filter((v) => {
        return v.phen === 'R' | v.phen === 'S'
      })
      $scope.events.splice(2, 0, data.curphase)
      $scope.events.splice(3, 0, data.closestphase)
      // console.log('events array:', $scope.events);
    });

}]);

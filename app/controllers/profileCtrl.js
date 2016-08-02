'use strict';

app.controller('profileCtrl', ['$scope','profileFactory', 'authFactory', '$window', function($scope, proFac, af, $window) {
  $scope.userId = af.getUser();
  // $scope.initiate = (function () {
  //   $('.expander-trigger').click(function(e) {
  //     // grab the img & button group for the clicked favorite list item  only
  //     let $favImg = $(e.currentTarget.parentNode.parentNode.parentNode.children[0]),
  //         $buttonGroup = $(e.currentTarget.parentNode.parentNode.parentNode.children[2]);
  //     $(this).toggleClass('expander-hidden');
  //     $favImg.toggleClass('hidden');
  //     $buttonGroup.toggleClass('hidden');
  //   });
  // })();
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
    console.log($scope.favorites);
  };
  proFac.getFavorites($scope.loadDataArray, $scope.userId);

  $scope.hdUrl = (url) => {
    $window.open(url);
  };

  $scope.deleteFavorite = (favId) => {
    proFac.deleteFromFavorites(favId);
    console.log('delted song:', favId);
  };



}]);

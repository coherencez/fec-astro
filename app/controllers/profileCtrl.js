'use strict';

app.controller('profileCtrl', ['$scope','profileFactory', 'authFactory', function($scope, proFac, af) {
  $scope.favorites = [];
  $scope.initiate = (function () {
    $('.expander-trigger').click(function(e) {
      // grab the img & button group for the clicked favorite list item  only
      let $favImg = $(e.currentTarget.parentNode.parentNode.parentNode.children[0]),
          $buttonGroup = $(e.currentTarget.parentNode.parentNode.parentNode.children[2]);
      $(this).toggleClass('expander-hidden');
      $favImg.toggleClass('hidden');
      $buttonGroup.toggleClass('hidden');
    });
  })();

  $scope.logInfo = (data) => {
    angular.forEach(data, (v, k) => {
      $scope.favorites.push(v);
    })
  };
  proFac.getFavorites($scope.logInfo, af.getUser())



}]);

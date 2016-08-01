'use strict';

app.controller('profileCtrl', ['$scope', function($scope) {
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

}]);

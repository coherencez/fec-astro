'use strict';

app.controller('profileCtrl', ['$scope', function($scope) {
  $scope.initiate = (function () {
    $('.expander-trigger').click(function(){
      $(this).toggleClass("expander-hidden");
      });
   })();

}]);

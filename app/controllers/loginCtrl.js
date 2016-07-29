'use strict';

app.controller('loginCtrl', ['$scope', '$route', 'authFactory', function($scope, $route, authFactory) {
  $scope.dummy = () => console.log('hello');

  $scope.googleLogin = () => {
    authFactory.authWithProvider(authFactory.googleProvider)
      .then((result) =>  console.log("logged in user google:", result.user.uid))
      .catch((err) => console.log(err));
  };

  $scope.newEmail = function () {
    authFactory.createWithEmail($scope.email, $scope.password)
    .then((result) =>  console.log("signed up user email:", result.uid))
    .catch((err) => console.log(err));
  };

  $scope.existingEmail = function () {
    authFactory.authWithEmail($scope.email, $scope.password)
    .then((result) =>  console.log("logged in user email:", result.uid))
    .catch((err) => console.log(err));
  };
}]);

'use strict';

app.controller('loginCtrl', ['$scope', '$route', 'authFactory', function($scope, $route, af) {

  $scope.googleLogin = () => {
    af.authWithProvider(af.googleProvider)
      .then((result) => { $route.reload(); console.log("logged in user google:", result.user.uid); })
      .catch((err) => console.log(err));
  };

  $scope.newEmail = function () {
    af.createWithEmail($scope.email, $scope.password)
    .then((result) =>  { $route.reload(); console.log("signed up user email:", result.uid); })
    .catch((err) => console.log(err));
  };

  $scope.existingEmail = function () {
    af.authWithEmail($scope.email, $scope.password)
    .then((result) =>  { $route.reload(); console.log("logged in user email:", result.uid); })
    .catch((err) => console.log(err));
  };

}]);

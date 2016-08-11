'use strict';

app.controller('loginCtrl', ['$scope', '$route', 'authFactory', function($scope, $route, af) {

  $scope.googleLogin = () => {
    af.authWithProvider(af.googleProvider)
      .then((result) => {
        $route.reload();
        console.log("logged in user google:", result.user);

        // trying to create user profile on login, not working for Google auth atm.
        // let userObj = {};
        //     userObj.displayName = result.user.displayName;
        //     userObj.uid = result.user.uid;
        //     userObj.email = result.user.email;
        //     console.log('user obj', userObj);
        // af.createUserProfile(userObj)

      })
      .catch((err) => console.log(err));
  };

  $scope.newEmail = function () {
    af.createWithEmail($scope.email, $scope.password)
    .then((result) =>  {
      let userObj = {};
          userObj.uid = result.uid;
          userObj.email = result.email;
      af.createUserProfile(userObj)
      .then((result) => {
        console.log('obj reference', result.path.o[1])
        af.setUserProfReference(result.path.o[1])
        $route.reload();
      });
    })
    .catch((err) => console.log(err));
  };

  $scope.existingEmail = function () {
    af.authWithEmail($scope.email, $scope.password)
    .then((result) =>  {
      af.getProfile(result.uid)
        .then((result) => {
          console.log('profile', Object.keys(result.val())[0] )
          af.setUserProfReference(Object.keys(result.val())[0]);
          $route.reload()
        })
    })
    .catch((err) => console.log(err));
  };

}]);

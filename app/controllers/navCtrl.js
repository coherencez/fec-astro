'use strict';

app.controller('navCtrl', ['$scope', '$route', 'authFactory', function($scope, $route, authFactory) {
  $scope.loginStatus = () => authFactory.userState();

  $scope.logout = function(){
		 firebase.auth().signOut()
		 .then(function() {
			 // Sign-out successful.
			 $route.reload();
			 console.log(authFactory.getUser(), "Logged out");
			 authFactory.setUser(null);
		 }, function(error) {
			 // An error happened.
			 console.log(error);
		 });
	 };
}]);

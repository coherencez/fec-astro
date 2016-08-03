'use strict';

app.controller('navCtrl', ['$scope', '$route', 'authFactory', '$rootScope', function($scope, $route, authFactory, $rootScope) {

  $rootScope.searchText = {};
  $rootScope.searchText.search = "";

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


   $(window).resize(function() {
    var more = document.getElementById("js-navigation-more");
    if ($(more).length > 0) {
      var windowWidth = $(window).width();
      var moreLeftSideToPageLeftSide = $(more).offset().left;
      var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

      if (moreLeftSideToPageRightSide < 330) {
        $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
        $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
      }

      if (moreLeftSideToPageRightSide > 330) {
        $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
        $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
      }
    }
  });

  $(document).ready(function() {
    var menuToggle = $("#js-mobile-menu").unbind();
    $("#js-navigation-menu").removeClass("show");

    menuToggle.on("click", function(e) {
      e.preventDefault();
      $("#js-navigation-menu").slideToggle(function(){
        if($("#js-navigation-menu").is(":hidden")) {
          $("#js-navigation-menu").removeAttr("style");
        }
      });
    });
  });

}]);

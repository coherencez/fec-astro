'use strict';

app.controller('navCtrl', ['$scope', '$route', 'authFactory', '$rootScope', '$location', function($scope, $route, authFactory, $rootScope, $location) {

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

// secret nav menu
  const navArr = ['pictures()', 'profile()', 'potd()', 'logout()', 'login()'];
  const message = 'Use the options below to navigate the app.\nJust type your choice exactly as it is shown in the console.\nEnjoy!\n\n'
  const nav = () => {
    console.warn('Congratulations on finding the secrect nav menu!\n')
    console.log(message)
    console.warn('Nav Options:')
    console.info(navArr.join('\n'))
  };
  const pictures = () => {
    $location.url('/pictures')
    $scope.$apply();
  };
  const profile = () => {
    $location.url('/profile')
    $scope.$apply();
  };
  const potd = () => {
    $location.url('/splash')
    $scope.$apply();
  };
  const login = () => {
    $location.url('/login')
    $scope.$apply();
  };

  window.nav = nav;
  window.pictures = pictures;
  window.profile = profile;
  window.potd = potd;
  window.login = login;
  window.logout = $scope.logout;
// end console nav

}]);

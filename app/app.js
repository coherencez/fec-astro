'use strict';
const app = angular.module("AstroApp", ['ngRoute', 'ngAnimate'])
.constant('FirebaseURL', "https://astroapp-e14f8.firebaseio.com");

app.config(['$routeProvider', function ($routeProvider) {
  // routing here
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/loginView.html',
      controller: 'loginCtrl'
    })
    .otherwise('/login')
}]);

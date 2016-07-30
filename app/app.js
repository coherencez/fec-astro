'use strict';
const app = angular.module("AstroApp", ['ngRoute', 'ngAnimate'])
.constant('FirebaseURL', 'https://astroapp-e14f8.firebaseio.com');

app.config(['$routeProvider', function ($routeProvider) {
  // routing here
  $routeProvider
    .when('/splash', {
      templateUrl: '/partials/defaultView.html',
      controller: 'defaultCtrl'
    })
    .when('/pictures', {
      templateUrl: 'partials/picturesView.html'
    })
    .when('/profile', {
      templateUrl: 'partials/profileView.html'
    })
    .when('/login', {
      templateUrl: 'partials/loginView.html',
      controller: 'loginCtrl'
    })
}]);

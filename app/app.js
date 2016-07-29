'use strict';
const app = angular.module("AstroApp", ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider) {
  // routing here
  $routeProvider
    .when('/splash', {
      templateUrl: '/partials/defaultView.html',
      controller: 'defaultCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/loginView.html',
      controller: 'loginCtrl'
    })
}]);

'use strict';

/**
 * @ngdoc overview
 * @name weatherApp
 * @description
 * # weatherApp
 *
 * Main module of the application.
 */
angular
  .module('weatherApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/city-summary.html'
      })
      .when('/cities/:id', {
        templateUrl: 'views/city-detail.html'
      });
  });

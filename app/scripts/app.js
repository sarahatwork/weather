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
    'ngCookies',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/weather.html',
        controller: 'WeatherCtrl'
      })
      .when('/cities/:id', {
        templateUrl: 'views/city-detail.html',
        controller: 'CityDetailCtrl'
      })
  });

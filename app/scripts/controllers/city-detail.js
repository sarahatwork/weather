'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:CityDetailCtrl
 * @description
 * # CityDetailCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('CityDetailCtrl', function (weather, $routeParams) {
    var self = this;
    this.city = {};

    weather.getCityByKey($routeParams.id, function(city) {
      self.city = city;
    })
  });

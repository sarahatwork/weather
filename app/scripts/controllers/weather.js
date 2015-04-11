'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('WeatherCtrl', ['weather', function (weather) {
    var self = this;
    this.query = 'Jersey City';
    this.cities = [];

    this.search = function() {
      weather.search(self.query, function(data) {
        self.cities.push(data);
        console.log(self.cities)
      });
    };

    this.search();
  }]);

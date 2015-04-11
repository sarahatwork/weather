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
    this.data = {};
    
    this.search = function() {
      weather.search(self.query, function(data) {
        self.data = data;
      });
    };
    
    this.search();
  }]);

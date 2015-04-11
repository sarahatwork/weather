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
    this.showForm = false;
    this.cities = [];

    this.search = function() {
      weather.search(self.query, function(data) {
        self.cities.push(data);
        self.query = '';
        self.showForm = false;
      });
    };
    
    this.toggleForm = function() {
      self.showForm = !self.showForm;
    }

    this.search();
  }]);

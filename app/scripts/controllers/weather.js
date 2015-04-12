'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('WeatherCtrl', function (weather) {
    var self = this;
    this.query = 'Jersey City';
    this.showForm = false;
    this.cities = [];

    // grid info
    this.columns = 2;
    this.cityRows = [];
    this.roomForButton = true;
    this.colSpan = function() {
      return 12 / self.columns;
    }

    this.search = function() {
      weather.getCityByQuery(self.query, function(cities) {
        self.query = '';
        self.showForm = false;
        self.cities = cities;
        
        self.organizeRows();
      });
    };
    
    this.organizeRows = function() {
      var currentRow = [];
      self.cityRows = [];
      
      var rowStartsAt = 0;
      var rowEndsAt = self.columns - 1;
      var count = self.cities.length;
      
      self.cities.forEach(function(city, i) {
        var modIdx = i % self.columns;
        currentRow.push(city)
        
        if (modIdx === rowEndsAt || i == count - 1) {
          // if ending row or last item
          self.cityRows.push(currentRow);
          currentRow = [];
        }

      });
      
      var lastRow = self.cityRows[self.cityRows.length - 1];
      this.roomForButton = lastRow && lastRow.length < self.columns;
    }
    
    this.toggleForm = function() {
      self.showForm = !self.showForm;
    }

    this.search();
  });

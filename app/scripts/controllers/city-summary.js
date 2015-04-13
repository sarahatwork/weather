'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('WeatherCtrl', function ($localStorage, city, cityNameFilter) {
    var self = this;
    this.query = '';
    this.cities = city.cities;

    this.filterQuery = '';
    this.error = '';
    
    // grid info
    this.$storage = $localStorage.$default({
      columns: 2
    });
    // this.cityRows = [];
    this.roomForButton = false;
    this.colSpan = function() {
      return 12 / self.$storage.columns;
    };
    
    this.search = function() {
      city.getCityByQuery(self.query, function(error) {
        self.query = '';
        // self.organizeRows(); // SHOULDNT NEED THIS
        self.error = error;
      });
    };
    
    // this.organizeRows = function() {
    //   var currentRow = [];
    //   self.cityRows = [];
    //
    //   var rowEndsAt = self.$storage.columns - 1;
    //   var count = self.cities.length;
    //
    //   self.cities.forEach(function(city, i) {
    //     var modIdx = i % self.$storage.columns;
    //     currentRow.push(city);
    //
    //     if (modIdx === rowEndsAt || i === count - 1) {
    //       // if ending row or last item
    //       self.cityRows.push(currentRow);
    //       currentRow = [];
    //     }
    //
    //   });
    //
    //   var lastRow = self.cityRows[self.cityRows.length - 1];
    //   this.roomForButton = lastRow && lastRow.length < self.$storage.columns;
    // };

    // city.getCities(function() {
    //   // self.organizeRows(); //TEMP
    // });

    this.updateCity = function(cityId) {
      city.updateCity(cityId);
    };
    
    this.deleteCity = function(cityId) {
      city.deleteCity(cityId);
    };
    
    this.filterCities = function() {
      city.loadCities(function(cities) {
        cityNameFilter(cities, self.filterQuery, function(c) {
          self.cities = c;
          // self.organizeRows(); // SHOULDNT NEED THIS
        });
      });
    };
  });

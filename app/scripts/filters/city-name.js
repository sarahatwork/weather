'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:cityName
 * @function
 * @description
 * # cityName
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('cityName', function () {
    return function (cities, query, callback) {
      if (query) {
        var filteredCities = cities.filter(function(city) {
          query = query.toLowerCase();
        
          return city.name.toLowerCase().indexOf(query) !== -1 ||
            city.state.toLowerCase().indexOf(query) !== -1
        });
        
        callback(filteredCities);
      } else {
        callback(cities);
      }
    };
  });

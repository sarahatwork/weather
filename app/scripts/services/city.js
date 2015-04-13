'use strict';

/**
 * @ngdoc service
 * @name weatherApp.city
 * @description
 * # city
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('city', function (weather, $localStorage, urlEncodeFilter) {
    var self = this;
    
    this.$storage = $localStorage.$default({
      // list of IDs, eg 'CITY-Jersey%20City_STATE-NJ'
      cityIds: [],
      // map of queries to IDs, eg 'Jersey City' => 'CITY-Jersey%20City_STATE-NJ'
      cityQueries: {},
      // queries that yielded no results
      duds: []
    });
    
    this.getCities = function() {
      return self.$storage.cityIds.map(function(cityId) {
        return self.$storage[cityId];
      });
    };
    
    this.loadCities = function(callback) {
      if (self.$storage.cityIds.length > 0) {
        // if we have some cities stored, return those
        callback(self.getCities(callback));
      } else {
        // else, grab some data for Jersey City
        self.getCityByQuery('Jersey City', callback);
      }
    };
    
    this.getCity = function(cityId, callback) {
      callback(self.$storage[urlEncodeFilter(cityId)]);
    };
    
    this.getCityByQuery = function(query, callback) {
      query = query.toLowerCase();
      
      if (self.$storage.duds.indexOf(query) !== -1) {
        callback(self.getCities(), 'Invalid city name.');
        return;
      }
      
      var cityId = self.$storage.cityQueries[query];
      
      if (cityId) {
        // if data exists

        if (self.$storage.cityIds.indexOf(cityId) === -1) {
          // make sure cityId is in cityIds array
          // (in case we deleted city from display but still have data)
          self.$storage.cityIds.push(cityId);
        }
          
        callback(self.getCities());
      } else {
        // else if no data, fetch data
        self.searchForCity(query, callback);
      }
    };

    this.updateCity = function(cityId, callback) {
      var cityData = self.$storage[cityId];
      self.searchForCity(cityData.name + ' ' + cityData.state, callback);
    }
    
    this.deleteCity = function(cityId, callback) {
      var idx = self.$storage.cityIds.indexOf(cityId);
      self.$storage.cityIds.splice(idx, 1);
      callback(self.getCities());
    };
    
    this.searchForCity = function(query, callback) {
      weather.search(query, function() {
        callback(self.getCities());
      });
    }
  });

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
    
    this.cities = [];
    
    this.$storage = $localStorage.$default({
      // list of IDs, eg 'CITY-Jersey%20City_STATE-NJ'
      cityIds: [],
      // map of queries to IDs, eg 'Jersey City' => 'CITY-Jersey%20City_STATE-NJ'
      cityQueries: {},
      // queries that yielded no results
      duds: []
    });
    
    this.loadCities = function() {
      if (self.$storage.cityIds.length === 0) {
        self.getCityByQuery('Jersey City');
      }
    };
    
    this.getCity = function(cityId, callback) {
      callback(self.$storage[urlEncodeFilter(cityId)]);
    };
    
    this.getCityByQuery = function(query, callback) {
      query = query.toLowerCase();
      
      if (self.$storage.duds.indexOf(query) !== -1) {
        callback('Invalid city name.');
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
      } else {
        // else if no data, fetch data
        weather.search(query, callback);
      }
    };

    this.updateCity = function(cityId, callback) {
      var cityData = self.$storage[cityId];
      weather.search(cityData.name + ' ' + cityData.state, callback);
    }
    
    this.deleteCity = function(cityId) {
      var idx = self.$storage.cityIds.indexOf(cityId);
      self.$storage.cityIds.splice(idx, 1);
    };
    
    var getCities = function() {
      self.$storage.cityIds.forEach(function(cityId) {
        self.cities.push(self.$storage[cityId]);
      });
    };
    
    getCities();
  });

'use strict';

/**
 * @ngdoc service
 * @name weatherApp.weather
 * @description
 * # weather
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('weather', function ($http, $localStorage, time, urlEncodeFilter) {
    var self = this;
    
    this.$storage = $localStorage.$default({
      // list of IDs, eg 'CITY-Jersey%20City_STATE-NJ'
      cityIds: [],
      // map of queries to IDs, eg 'Jersey City' => 'CITY-Jersey%20City_STATE-NJ'
      cityQueries: {},
      // queries that yielded no results
      duds: []
    });
    
    this.search = function(query, callback) {
      var queryString = 'select * from weather.forecast where woeid in ' +
                        '(select woeid from geo.places(1) where text="' + query + '")';
                
      var url = 'https://query.yahooapis.com/v1/public/yql?q=' +
                urlEncodeFilter(queryString) +
                '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
      
      $http.get(url).then(function (res) {
        var results = res.data.query.results;
        
        if (!results) {
          self.$storage.duds.push(query);
          callback(self.getCities(), 'Invalid city name.');
          return;
        }
        
        var channel = results.channel;
        var city = {};
      
        city.name = channel.location.city;
        city.state = channel.location.region;
        
        city.id = 'CITY-' + urlEncodeFilter(city.name) + '_STATE-' + city.state;
        city.dateUpdated = time.todaysDate();
        
        city.temp = channel.item.condition.temp;
        city.text = channel.item.condition.text;
        city.img = imgFor(channel.item.condition.code);
        
        city.forecast = channel.item.forecast.map(function(data) {
          data.img = imgFor(data.code);
          return data;
        });
        
        city.feelsLike = channel.wind.chill;
        city.windSpeed = channel.wind.speed;
        city.humidity = channel.atmosphere.humidity;
        city.visibility = channel.atmosphere.visibility;
        city.sunrise = channel.astronomy.sunrise;
        city.sunset = channel.astronomy.sunset;
        
        if (self.$storage.cityIds.indexOf(city.id) === -1) {
          self.$storage.cityIds.push(city.id);
        }
        
        self.$storage.cityQueries[query] = city.id;
        self.$storage[city.id] = city;
        
        callback(self.getCities());
      });
    };
    
    this.getCities = function() {
      return self.$storage.cityIds.map(function(cityId) {
        return self.$storage[cityId];
      });
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
        self.search(query, callback);
      }
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
    
    this.deleteCity = function(cityId, callback) {
      var idx = self.$storage.cityIds.indexOf(cityId);
      self.$storage.cityIds.splice(idx, 1);
      callback(self.getCities());
    };
    
    this.updateCity = function(cityId, callback) {
      var cityData = self.$storage[cityId];
      self.search(cityData.name + ' ' + cityData.state, callback);
    }
    
    // private methods
    
    var imgFor = function(code) {
      return 'http://l.yimg.com/a/i/us/we/52/' + code + '.gif';
    };
  });

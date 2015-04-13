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
    
    this.$storage = $localStorage;
    
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
          callback('Invalid city name.');
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
        
        callback();
      });
    };
    
    // private methods
    
    var imgFor = function(code) {
      return 'http://l.yimg.com/a/i/us/we/52/' + code + '.gif';
    };
  });

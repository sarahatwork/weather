'use strict';

/**
 * @ngdoc service
 * @name weatherApp.weather
 * @description
 * # weather
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('weather', function ($http, $cookies, urlEncodeFilter) {
    var self = this;
    this.cityIds = ($cookies['cityIds'] && angular.fromJson($cookies['cityIds'])) || [];
    this.cityQueries = ($cookies['cityQueries'] && angular.fromJson($cookies['cityQueries'])) || {};
    
    this.imgFor = function(code) {
      return 'http://l.yimg.com/a/i/us/we/52/' + code + '.gif';
    }
    
    this.search = function(query, callback) {
      var queryString = "select * from weather.forecast where woeid in " +
                        "(select woeid from geo.places(1) where text=\"" + query + "\")";
                
      var url = "https://query.yahooapis.com/v1/public/yql?q=" +
                urlEncodeFilter(queryString) +
                "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      
      $http.get(url).then(function (res) {
        console.log('i just made a request for ' + query)
        var channel = res.data.query.results.channel;
        var city = {};
      
        city.name = channel.location.city;
        city.state = channel.location.region;
        city.id = channel.item.guid.content;
        
        city.temp = channel.item.condition.temp;
        city.text = channel.item.condition.text;
        city.img = self.imgFor(channel.item.condition.code);
        
        city.forecast = channel.item.forecast.map(function(data) {
          data.img = self.imgFor(data.code);
          return data;
        });
        
        city.feelsLike = channel.wind.chill
        city.windSpeed = channel.wind.speed
        city.humidity = channel.atmosphere.humidity
        city.visibility = channel.atmosphere.visibility
        city.sunrise = channel.astronomy.sunrise
        city.sunset = channel.astronomy.sunset
        
        if (self.cityIds.indexOf(city.id) === -1) {
          self.cityIds.push(city.id);
        }
        
        if (!self.cityQueries[query]) {
          self.cityQueries[query] = city.id;
        }
        
        $cookies['cityIds'] = angular.toJson(self.cityIds);
        $cookies['cityQueries'] = angular.toJson(self.cityQueries);
        
        if (!$cookies[city.id]) {
          $cookies[city.id] = angular.toJson(city)
        }
        
        callback(self.cityData());
      });
    };
    
    this.cityData = function() {
      return self.cityIds.map(function(key) {
        return angular.fromJson($cookies[key]);
      });
    }
    
    this.getCityByQuery = function(query, callback) {
      if (self.cityQueries[query]) {
        callback(self.cityData());
      } else {
        self.search(query, callback)
      }
    }
    
    this.getCityByKey = function(key, callback) {
      callback(angular.fromJson($cookies[key]));
    }
  });

'use strict';

/**
 * @ngdoc service
 * @name weatherApp.weather
 * @description
 * # weather
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('weather', ['$http', function ($http) {
    var self = this;
    this.cities = {};
    
    this.imgFor = function(code) {
      return 'http://l.yimg.com/a/i/us/we/52/' + code + '.gif';
    }
    
    this.search = function(query, callback) {
      var url = "https://query.yahooapis.com/v1/public/yql?q=select" +
                "%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
                "(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" +
                query + "%22)" +
                "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    
      $http.get(url).then(function (res) {
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
        
        self.cities[city.id] = city;
        
        callback(city);
      });
    };
    
    this.getCity = function(id, callback) {
      callback(self.cities[id]);
    };
  }]);

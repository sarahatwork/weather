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
    this.search = function(query, callback) {
      var url = "https://query.yahooapis.com/v1/public/yql?q=select" +
                "%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
                "(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" +
                query + "%22)" +
                "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    
      $http.get(url).then(function (res) {
        var channel = res.data.query.results.channel;
        var data = {};
      
        data.city = channel.location.city;
        data.state = channel.location.region;
      
        data.img = channel.item.description.match('img src=\"(.*)\"')[1];
        data.temp = channel.item.condition.temp;
        data.text = channel.item.condition.text;
        
        callback(data);
      });
    };
  }]);

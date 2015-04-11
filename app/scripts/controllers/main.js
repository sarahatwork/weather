'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('MainCtrl', ['$http', function ($http) {
    var self = this;
    this.query = 'Jersey City';
    this.data = {};
    
    this.search = function() {
      var url = "https://query.yahooapis.com/v1/public/yql?q=select" +
                "%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
                "(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" +
                self.query + "%22)" +
                "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      
      $http.get(url).then(function (res) {
        var channel = res.data.query.results.channel;
        
        self.data.city = channel.location.city;
        self.data.state = channel.location.region;
        
        self.data.img = channel.item.description.match('img src=\"(.*)\"')[1];
        self.data.temp = channel.item.condition.temp;
        self.data.text = channel.item.condition.text;
      });
    };
    
    this.search();
  }]);

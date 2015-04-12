'use strict';

/**
 * @ngdoc service
 * @name weatherApp.weather
 * @description
 * # weather
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('weather', function ($http, $localStorage, $filter, urlEncodeFilter) {
    var self = this;
    
    this.$storage = $localStorage.$default({
      // list of IDs, eg 'USNJ0234_2015_04_16_7_00_EDT'
      cityIds: [],
      // map of queries to IDs, eg 'Jersey City' => 'USNJ0234_2015_04_16_7_00_EDT'
      cityQueries: {}
    });
    
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
        
        city.id = 'CITY:' + urlEncodeFilter(city.name) + '_STATE:' + city.state;
        city.dateUpdated = self.todaysDate();
        
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
        
        if (self.$storage.cityIds.indexOf(city.id) === -1) {
          self.$storage.cityIds.push(city.id);
        }
        
        if (!self.$storage.cityQueries[query]) {
          self.$storage.cityQueries[query] = city.id;
        }
        
        if (!self.$storage[city.id]) {
          self.$storage[city.id] = city;
        }
        
        callback(self.cityData());
      });
    };
    
    this.cityData = function() {
      return self.$storage.cityIds.map(function(key) {
        return self.$storage[key];
      });
    }
    
    this.getCityByQuery = function(query, callback) {
      var currentId = self.$storage.cityQueries[query];
      
      if (currentId) {
        // if data exists
        var lastUpdatedDate = self.$storage[currentId].dateUpdated;
        
        if (self.todaysDate() === lastUpdatedDate) {
          // if last updated today, we're good
          callback(self.cityData());
        } else {
          // else, clear data
          self.$storage[currentId] = null;
          self.search(query, callback)
        }
        
      } else {
        // else if no data, fetch data
        self.search(query, callback)
      }
    }
    
    this.getCityByKey = function(key, callback) {
      callback(self.$storage[key]);
    }
    
    this.todaysDate = function() {
      return $filter('date')(new Date(), "MM-dd-yyyy");
    }
  });

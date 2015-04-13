'use strict';

/**
 * @ngdoc service
 * @name weatherApp.time
 * @description
 * # time
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('time', function ($filter) {
    this.todaysDate = function() {
      return $filter('date')(new Date(), 'MM-dd-yyyy');
    };
    
    this.isTodaysDate = function(string) {
      return string === this.todaysDate();
    }
  });

'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:citySummary
 * @description
 * # citySummary
 */
angular.module('weatherApp')
  .directive('citySummary', function () {
    return {
      templateUrl: 'views/city-summary.html',
      restrict: 'A'
    };
  });

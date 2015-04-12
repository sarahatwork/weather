'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:citySummary
 * @description
 * # citySummary
 */
angular.module('weatherApp')
  .directive('citySummary', function (weather) {
    return {
      templateUrl: 'views/city-summary.html',
      restrict: 'A',
      scope: {
        city: '='
      },
      controller: function($scope) {
        $scope.deleteCity = function() {
          debugger;
        }
      }
    };
  });

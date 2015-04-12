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
      restrict: 'A',
      scope: {
        city: '=',
        deleteCity: '&'
      },
      controller: function($scope) {
        $scope.onClickCloseButton = function() {
          $scope.deleteCity({
            cityId: $scope.city.id
          });
        };
      }
    };
  });

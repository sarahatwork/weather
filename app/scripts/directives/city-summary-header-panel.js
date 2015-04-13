'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:citySummaryHeaderPanel
 * @description
 * # citySummaryHeaderPanel
 */
angular.module('weatherApp')
  .directive('citySummaryHeaderPanel', function () {
    return {
      templateUrl: 'views/city-summary-header-panel.html',
      restrict: 'A'
    };
  });

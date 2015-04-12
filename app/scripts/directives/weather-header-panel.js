'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:weatherHeaderPanel
 * @description
 * # weatherHeaderPanel
 */
angular.module('weatherApp')
  .directive('weatherHeaderPanel', function () {
    return {
      templateUrl: 'views/weather-header-panel.html',
      restrict: 'A'
    };
  });

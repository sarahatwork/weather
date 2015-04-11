'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:addCity
 * @description
 * # addCity
 */
angular.module('weatherApp')
  .directive('addCity', function () {
    return {
      templateUrl: 'views/new-city.html',
      restrict: 'A',
      scope: true
    };
  });

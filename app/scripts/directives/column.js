'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:columns
 * @description
 * # columns
 */
angular.module('weatherApp')
  .directive('column', function () {
    return {
      restrict: 'A',
      require: '^columns',
      link: function($scope, $element, $attrs, columnCtrl) {
        columnCtrl.registerColumn($element.html());
      }
    };
  });

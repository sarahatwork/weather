'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:columns
 * @description
 * # columns
 */
angular.module('weatherApp')
  .directive('columns', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the columns directive');
      }
    };
  });

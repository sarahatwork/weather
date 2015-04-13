'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:debug
 * @description
 * # debug
 */
angular.module('weatherApp')
  .directive('debug', function ($location) {
    return {
      restrict: 'A',
      transclude: 'element',
      link: function($scope, $element, $attrs, ctrl, $transclude) {
        if ($location.search().debug === undefined) { return; }
        
        $transclude($scope, function(clonedElement, scope) {
          $element.after(clonedElement);
        });
      }
    };
  });

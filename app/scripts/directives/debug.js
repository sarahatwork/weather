'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:debug
 * @description
 * # debug
 */
angular.module('weatherApp')
  .directive('debug', function ($location, $compile) {
    return {
      restrict: 'A',
      compile: function ( $element, attr ) {
        console.log($location.search().debug)
        console.log($location.search().debug !== undefined)
        $element.attr('ng-show', $location.search().debug !== undefined)
        $element.removeAttr('debug');
        var fn = $compile($element);
        
        return function(scope) {
          fn(scope);
        };
      }
    };
  });

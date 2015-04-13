'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:resetStorage
 * @description
 * # resetStorage
 */
angular.module('weatherApp')
  .directive('resetStorage', function ($compile, $localStorage) {
    return {
      restrict: 'A',
      transclude: true,
      template: '<a ng-click="resetStorage()">' +
                  '<ng-transclude></ng-transclude>' +
                '</a>',
      link: function($scope, $element, $attrs) {
        $scope.resetStorage = function() {
          $localStorage.$reset({
            columns: 2
          });
        };
      }
    };
  });
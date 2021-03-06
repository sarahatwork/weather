'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:addCity
 * @description
 * # addCity
 */
angular.module('weatherApp')
  .directive('addCity', function ($timeout) {
    return {
      templateUrl: 'views/add-city.html',
      restrict: 'A',
      link: function($scope, $element) {
        $scope.showForm = false;
        $scope.$element = $element;
        
        $scope.toggleForm = function() {
          $scope.showForm = !$scope.showForm;
          $timeout(function() {
            $scope.$element.find('.add-city-input')[0].focus();
          });
          $scope.ctrl.error = null;
        };
      }
    };
  });

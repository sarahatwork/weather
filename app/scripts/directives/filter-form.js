'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:filterForm
 * @description
 * # filterForm
 */
angular.module('weatherApp')
  .directive('filterForm', function () {
    return {
      templateUrl: 'views/filter-form.html',
      restrict: 'A'
    };
  });

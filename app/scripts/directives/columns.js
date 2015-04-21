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
      restrict: 'A',
      scope: {
        colCount: '='
      },
      transclude: true,
      template: '<div ng-transclude></div>'
      controller: function($scope) {
        var columns = []
        
        var colCount = $scope.colCount;
        var span = 12 / colCount;
        var coltag = '<div class="col-sm-' + span + '"></div>';
        
        var container = angular.element('<div></div>');
        var currentRow = angular.element('<div class="row"></div>');

        var rowEndsAt = colCount - 1;
        
        this.registerColumn = function(html) {
          columns.push(angular.element(html));
          console.log(columns);
        }
      }
    };
  });

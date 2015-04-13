'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:citySummaryBlock
 * @description
 * # citySummaryBlock
 */
angular.module('weatherApp')
  .directive('citySummaryBlock', function (weather, time) {
    return {
      templateUrl: 'views/city-summary-block.html',
      restrict: 'A',
      scope: {
        city: '=',
        deleteCity: '&',
        updateCity: '&'
      },
      controller: function($scope) {
        // if ($scope.city.name === 'DUMBO') {
        //   $scope.city.dateUpdated = '01-01-01';
        // }
        
        $scope.onClickCloseButton = function() {
          $scope.deleteCity({
            cityId: $scope.city.id
          });
        };
        
        var checkTime = function() {
          console.log('im checking the time');
          return time.isTodaysDate($scope.city.dateUpdated);
        };

        $scope.$watch(checkTime, function(isTodaysDate) {
          if (!isTodaysDate) {
            console.log($scope.city.name + ' no longer todays date!');
            $scope.updateCity({
              cityId: $scope.city.id
            });
          } else {
            console.log($scope.city.name + ' still todays date')
          }
        })
      }
    };
  });

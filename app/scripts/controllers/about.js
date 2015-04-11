'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

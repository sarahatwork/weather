'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:urlEncode
 * @function
 * @description
 * # urlEncode
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('urlEncode', function () {
    return window.encodeURIComponent;
  });

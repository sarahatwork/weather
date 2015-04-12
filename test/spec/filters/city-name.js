'use strict';

describe('Filter: cityName', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var cityName;
  beforeEach(inject(function ($filter) {
    cityName = $filter('cityName');
  }));

  it('should return the input prefixed with "cityName filter:"', function () {
    var text = 'angularjs';
    expect(cityName(text)).toBe('cityName filter: ' + text);
  });

});

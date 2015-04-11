'use strict';

describe('Directive: citySummary', function () {

  // load the directive's module
  beforeEach(module('weatherApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<city-summary></city-summary>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the citySummary directive');
  }));
});

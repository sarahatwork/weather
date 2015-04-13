'use strict';

describe('Directive: debug', function () {

  // load the directive's module
  beforeEach(module('weatherApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<debug></debug>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the debug directive');
  }));
});

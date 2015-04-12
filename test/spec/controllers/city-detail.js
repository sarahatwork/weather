'use strict';

describe('Controller: CityDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherApp'));

  var CityDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CityDetailCtrl = $controller('CityDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

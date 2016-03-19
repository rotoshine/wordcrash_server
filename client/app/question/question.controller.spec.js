'use strict';

describe('Component: WordComponent', function () {

  // load the controller's module
  beforeEach(module('hjHomeworkAdminApp'));

  var WordComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    WordComponent = $componentController('WordComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Component: QuizComponent', function () {

  // load the controller's module
  beforeEach(module('hjHomeworkAdminApp'));

  var QuizComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QuizComponent = $componentController('QuizComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

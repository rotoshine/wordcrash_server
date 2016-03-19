'use strict';

describe('Component: QuizResultComponent', function () {

  // load the controller's module
  beforeEach(module('hjHomeworkAdminApp'));

  var QuizResultComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QuizResultComponent = $componentController('QuizResultComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

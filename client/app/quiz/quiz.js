'use strict';

angular.module('hjHomeworkAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quiz', {
        url: '/quiz',
        template: '<quiz></quiz>'
      });
  });

'use strict';

angular.module('hjHomeworkAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quiz-result', {
        url: '/quiz-result',
        template: '<quiz-result></quiz-result>'
      });
  });

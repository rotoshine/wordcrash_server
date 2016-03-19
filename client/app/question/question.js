'use strict';

angular.module('hjHomeworkAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question',
        template: '<question></question>'
      });
  });

'use strict';

angular.module('hjHomeworkAdminApp.auth', [
  'hjHomeworkAdminApp.constants',
  'hjHomeworkAdminApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

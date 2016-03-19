'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': '문제 만들기',
    'state': 'question'
  }, {
    'title': '시험 만들기',
    'state': 'quiz'
  }, {
    'title': '시험결과 조회',
    'state': 'quiz-result'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('hjHomeworkAdminApp')
  .controller('NavbarController', NavbarController);

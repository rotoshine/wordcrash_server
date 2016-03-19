'use strict';
(function(){

class QuizResultComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('hjHomeworkAdminApp')
  .component('quizResult', {
    templateUrl: 'app/quiz-result/quiz-result.html',
    controller: QuizResultComponent
  });

})();

'use strict';
(function(){

class QuestionController {
  constructor($http, $scope) {
    this.$http = $http;
    this.form = {};
    this.wordCount = 0;

    this.getQuestionCount();
  }

  getQuestionCount () {
    this.$http.get('/api/questions/count', (result)=>{
      this.wordCount = result.count;
    });
  }

  save (e) {
    e.preventDefault();
    console.log(this.form);
    let form = this.form;
    this.$http.post('/api/questions', {
      questionText: form.questionText,
      currectAnswer: form.currectAnswer
    });

    this.form = {};
  }
}

angular.module('hjHomeworkAdminApp')
  .component('question', {
    templateUrl: 'app/question/question.html',
    controller: QuestionController
  });

})();

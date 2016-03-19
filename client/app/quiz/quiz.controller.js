'use strict';
(function(){

class QuizComponent {
  constructor($http) {
    this.$http = $http;
    this.selectedQuestionText = '';
    this.title = '';
    this.addQuestions = [];

    $http.get('/api/quiz')
      .then((result) => {
        this.quizs = result.data;
      });
  }

  addQuestion() {
    this.$http.get(`/api/questions/find-by-question-text/${this.selectedQuestionText}`)
      .then((response)=>{
        this.addQuestions.push(response.data);
        this.selectedQuestionText = '';
      }, ()=>{
        alert(`${this.selectedQuestionText} 문제가 없습니다. 단어를 먼저 등록해주세요.`);
      });
  }
  save() {
    if(this.addQuestions.length === 0){
      alert('문제를 선택해주세요.');
    }else if(confirm(`${this.addQuestions.length}개의 문제로 시험 만들겠습니까?`)){
      let questionIds = [];
      this.addQuestions.forEach(question => questionIds.push(question._id));
      let quiz = {
        title: this.title,
        questions: questionIds
      };

      this.$http.post(`/api/quiz`, quiz)
        .then(()=>{
            alert('문제가 등록되었습니다.');
            this.addQuestions = [];
            this.title = '';
        });
    }
  }
}

angular.module('hjHomeworkAdminApp')
  .component('quiz', {
    templateUrl: 'app/quiz/quiz.html',
    controller: QuizComponent
  });

})();

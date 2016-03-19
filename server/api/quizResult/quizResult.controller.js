/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/quizResults              ->  index
 * POST    /api/quizResults              ->
 * GET     /api/quizResults/:id          ->  show
 * PUT     /api/quizResults/:id          ->  update
 * DELETE  /api/quizResults/:id          ->  destroy
 */

'use strict';
import async from 'async';
import _ from 'lodash';
import Question from '../question/question.model';
import Quiz from '../quiz/quiz.model';
import QuizResult from './quizResult.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * 채점한다.
 */
function scoring(form, res){
  console.log(form);
  return Quiz.findById(form.quiz).populate('questions').exec()
    .then((quiz) => {
      console.log(quiz);
      let quizResult = new QuizResult({
        user: form.user,
        quiz: quiz._id,
        answers: []
      });

      // 채점을 한다!!
      let answerTexts = form.answerTexts;
      console.log(quiz.questions.length === Object.keys(answerTexts).length);
      if(quiz.questions.length === Object.keys(answerTexts).length){
        // 파서 따로 만들자.
        quiz.questions.forEach((question) => {
          if(answerTexts.hasOwnProperty(question._id)){
            let answerText = answerTexts[question._id].answerText;
            let answer = {
              question: question._id,
              isCurrect: false,
              answerText: answerText
            }
            console.log(answer);
            if(question.currectAnswerType === 'LIKE'){
              if(question.currectAnswer.indexOf(answerText) > -1){
                answer.isCurrect = true;
              }
            }

            quizResult.answers.push(answer);
          }
        });
        console.log(quizResult);
        return quizResult.save()
          .then(respondWithResult(res, 201))
          .catch(handleError(res));;

      }else{
        return handleError(new Error("문제 갯수와 대답 갯수가 일치하지 않습니다."));
      }
    });

}

// Gets a list of QuizResults
export function index(req, res) {
  return QuizResult.find().populate('quiz').exec(function(err, data){
      if(err){
        return handleError(res);
      }

      return async.forEach(data, (quizResult, next) => {
        Question.populate(quizResult,
          {
            path: 'answers.question',
            select: 'questionText currectAnswer'
          }, (err) => {
          quizResult.quiz.questions.forEach((d)=>console.log(d));
          if(err){
            throw err;
          }
          return next();
        });
      }, () => {
        return res.json(data);
      });
    })
    .catch(handleError(res));
}

// Gets a single QuizResult from the DB
export function show(req, res) {
  return QuizResult.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new QuizResult in the DB
export function create(req, res) {
  return scoring(req.body, res);
}

// Updates an existing QuizResult in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return QuizResult.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a QuizResult from the DB
export function destroy(req, res) {
  return QuizResult.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

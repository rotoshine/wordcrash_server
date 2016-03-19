'use strict';

var app = require('../..');
import request from 'supertest';

var newQuiz;

describe('Quiz API:', function() {

  describe('GET /api/quizs', function() {
    var quizs;

    beforeEach(function(done) {
      request(app)
        .get('/api/quizs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          quizs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      quizs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/quizs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/quizs')
        .send({
          name: 'New Quiz',
          info: 'This is the brand new quiz!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newQuiz = res.body;
          done();
        });
    });

    it('should respond with the newly created quiz', function() {
      newQuiz.name.should.equal('New Quiz');
      newQuiz.info.should.equal('This is the brand new quiz!!!');
    });

  });

  describe('GET /api/quizs/:id', function() {
    var quiz;

    beforeEach(function(done) {
      request(app)
        .get('/api/quizs/' + newQuiz._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          quiz = res.body;
          done();
        });
    });

    afterEach(function() {
      quiz = {};
    });

    it('should respond with the requested quiz', function() {
      quiz.name.should.equal('New Quiz');
      quiz.info.should.equal('This is the brand new quiz!!!');
    });

  });

  describe('PUT /api/quizs/:id', function() {
    var updatedQuiz;

    beforeEach(function(done) {
      request(app)
        .put('/api/quizs/' + newQuiz._id)
        .send({
          name: 'Updated Quiz',
          info: 'This is the updated quiz!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQuiz = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuiz = {};
    });

    it('should respond with the updated quiz', function() {
      updatedQuiz.name.should.equal('Updated Quiz');
      updatedQuiz.info.should.equal('This is the updated quiz!!!');
    });

  });

  describe('DELETE /api/quizs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/quizs/' + newQuiz._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when quiz does not exist', function(done) {
      request(app)
        .delete('/api/quizs/' + newQuiz._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

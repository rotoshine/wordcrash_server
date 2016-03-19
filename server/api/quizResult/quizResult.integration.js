'use strict';

var app = require('../..');
import request from 'supertest';

var newQuizResult;

describe('QuizResult API:', function() {

  describe('GET /api/quizResults', function() {
    var quizResults;

    beforeEach(function(done) {
      request(app)
        .get('/api/quizResults')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          quizResults = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      quizResults.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/quizResults', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/quizResults')
        .send({
          name: 'New QuizResult',
          info: 'This is the brand new quizResult!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newQuizResult = res.body;
          done();
        });
    });

    it('should respond with the newly created quizResult', function() {
      newQuizResult.name.should.equal('New QuizResult');
      newQuizResult.info.should.equal('This is the brand new quizResult!!!');
    });

  });

  describe('GET /api/quizResults/:id', function() {
    var quizResult;

    beforeEach(function(done) {
      request(app)
        .get('/api/quizResults/' + newQuizResult._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          quizResult = res.body;
          done();
        });
    });

    afterEach(function() {
      quizResult = {};
    });

    it('should respond with the requested quizResult', function() {
      quizResult.name.should.equal('New QuizResult');
      quizResult.info.should.equal('This is the brand new quizResult!!!');
    });

  });

  describe('PUT /api/quizResults/:id', function() {
    var updatedQuizResult;

    beforeEach(function(done) {
      request(app)
        .put('/api/quizResults/' + newQuizResult._id)
        .send({
          name: 'Updated QuizResult',
          info: 'This is the updated quizResult!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQuizResult = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuizResult = {};
    });

    it('should respond with the updated quizResult', function() {
      updatedQuizResult.name.should.equal('Updated QuizResult');
      updatedQuizResult.info.should.equal('This is the updated quizResult!!!');
    });

  });

  describe('DELETE /api/quizResults/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/quizResults/' + newQuizResult._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when quizResult does not exist', function(done) {
      request(app)
        .delete('/api/quizResults/' + newQuizResult._id)
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

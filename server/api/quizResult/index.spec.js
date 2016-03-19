'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var quizResultCtrlStub = {
  index: 'quizResultCtrl.index',
  show: 'quizResultCtrl.show',
  create: 'quizResultCtrl.create',
  update: 'quizResultCtrl.update',
  destroy: 'quizResultCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var quizResultIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './quizResult.controller': quizResultCtrlStub
});

describe('QuizResult API Router:', function() {

  it('should return an express router instance', function() {
    quizResultIndex.should.equal(routerStub);
  });

  describe('GET /api/quizResults', function() {

    it('should route to quizResult.controller.index', function() {
      routerStub.get
        .withArgs('/', 'quizResultCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/quizResults/:id', function() {

    it('should route to quizResult.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'quizResultCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/quizResults', function() {

    it('should route to quizResult.controller.create', function() {
      routerStub.post
        .withArgs('/', 'quizResultCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/quizResults/:id', function() {

    it('should route to quizResult.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'quizResultCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/quizResults/:id', function() {

    it('should route to quizResult.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'quizResultCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/quizResults/:id', function() {

    it('should route to quizResult.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'quizResultCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

/**
 * QuizResult model events
 */

'use strict';

import {EventEmitter} from 'events';
var QuizResult = require('./quizResult.model');
var QuizResultEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuizResultEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  QuizResult.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QuizResultEvents.emit(event + ':' + doc._id, doc);
    QuizResultEvents.emit(event, doc);
  }
}

export default QuizResultEvents;

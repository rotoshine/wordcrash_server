/**
 * Quiz model events
 */

'use strict';

import {EventEmitter} from 'events';
var Quiz = require('./quiz.model');
var QuizEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuizEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Quiz.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QuizEvents.emit(event + ':' + doc._id, doc);
    QuizEvents.emit(event, doc);
  }
}

export default QuizEvents;

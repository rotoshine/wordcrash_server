'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    default: 'SHORT_WORD'
  },
  currectAnswer: {
    type: String,
    required: true
  },
  currectAnswerType: {
    type: String,
    default: 'LIKE'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('Question', QuestionSchema);

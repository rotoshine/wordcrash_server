'use strict';

import mongoose from 'mongoose';

var QuizResultSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      },
      answerText: String,
      isCurrect: Boolean
    }
  ],
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('QuizResult', QuizResultSchema);

'use strict';

import mongoose from 'mongoose';

var QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('Quiz', QuizSchema);

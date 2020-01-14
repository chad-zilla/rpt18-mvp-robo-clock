const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/roboclock', {useNewUrlParser: true});

let task = mongoose.model('Task', {
  name:  {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  duration: {
    seconds: Number,
    minutes: Number
  },
  isTracking: {
    type: Number
  },
  // start: {
  //   type: Date
  // },
  // end: {
  //   type: Date
  // }
});

module.exports = task;


const express = require('express');
const app = express();
const port = 1128;
const bodyParser = require('body-parser');
const path = require('path');
const Task = require('../database/index');
const moment = require('moment');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/tasks', (req, res) => {
  Task.find()
  .then((tasks)=>{
    res.send(tasks);
  });
});

app.post('/addTask', (req, res) => {
  let newTaskName = req.body.name;
  let newTaskDescription = req.body.description;
  let newTaskIsTracking = req.body.isTracking;
  let newTaskDuration = req.body.duration;
  const task = new Task({
    name: newTaskName,
    description: newTaskDescription,
    isTracking: newTaskIsTracking,
    duration: newTaskDuration  });
  task.save()
  .then( (addedTask)=>{
    res.send(addedTask);
  })
  .catch( (err) => {
    console.log(err);
  });
});

app.patch( '/toggleStatus/:taskId', (req, res) => {
  let filter = {
    _id: req.params.taskId
  };
  console.log("before", req.body.isTracking);

  let change = {
    isTracking: Number(req.body.isTracking)
  }
  console.log("after", change);
  Task.findOneAndUpdate(filter, change, {new: true})
  .then( (task)=> {
    res.send(task);
  })
  .catch( (err) => {
    console.log(err);
  });
});

app.patch( '/updateDuration/:taskId', (req, res) => {
  console.log(req.body);
  let filter = {
    _id: req.params.taskId
  };
  let change = {
    duration:  {
      seconds: Number(req.body.seconds),
      minutes: Number(req.body.minutes)
    }
  }
  Task.findOneAndUpdate(filter, change, {new: true})
  .then( (data)=> {
    res.sendStatus(200)
  })
  .catch( (err) => {
    console.log(err);
  });
});

app.delete('/deleteTask/:taskId', (req, res) => {
  console.log(req.params.taskId);
  Task.deleteOne({_id: req.params.taskId})
  .then( (data)=> {
    console.log(data);
    res.send('deleted ' + data);
  })
  .catch( (err) => {
    console.log(err);
  })
});

app.listen(port,() => console.log(`listening on port ${port}`));
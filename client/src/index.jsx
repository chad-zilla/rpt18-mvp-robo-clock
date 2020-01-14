const React = require('react');
const ReactDom = require('react-dom');
const jQuery = require('jquery');
const moment = require('moment');
const _ = require('underscore');
import AddTask from './components/AddTask.jsx';
import TaskListing from './components/TaskListing.jsx';

class RoboClock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timer: undefined,
      tasks: [],
      newTask: {
        name: '',
        description: '',
        duration: {
          minutes: 0,
          seconds: 0
        },
        isTracking: 0
      },
      activeTask: {
        id: null
      }
    };
  }

  updateNewTask(e){
    let newTask = {...this.state.newTask};
    newTask[e.target.name] = e.target.value
    this.setState({
      newTask: newTask
    });
  }

  toggleTaskStatus(taskId, isTracking) {
    let toggleTracking = (Number(isTracking) === 0) ? 1: 0;
    let data = {
      isTracking: toggleTracking
    };
    jQuery.ajax({
      type: "PATCH",
      data: data,
      url: 'http://localhost:1128/toggleStatus/' + taskId,
      success: (data) => {
        let updatedTasks = [...this.state.tasks];
        let index = _.findIndex(updatedTasks, (task) => {
          return task.id === data._id
        });
        updatedTasks[index].isTracking = data.isTracking;
        if (data.isTracking) {
          this.startTimer(index);
        } else {
          this.stopTimer(updatedTasks[index].duration, updatedTasks[index].id);
        }
        this.setState({tasks: updatedTasks});
        this.clearNewTask();
      }
    });
  }

  startTimer(taskIndex) {
    this.state.timer = setInterval( () => {
      let tasks = [...this.state.tasks];
      tasks[taskIndex].duration.seconds++
      this.setState({ tasks });
    },1000);
  }

  stopTimer(duration, taskId) {
    jQuery.ajax({
      type: "PATCH",
      url: 'http://localhost:1128/updateDuration/'+ taskId,
      data: duration,
      success: (data) => {
        clearInterval(this.state.timer);
      }
    });

  }

  addTask(){
    jQuery.ajax({
      type: "POST",
      url: 'http://localhost:1128/addTask',
      data: this.state.newTask,
      success: (data) => {
        this.updateTaskView(data);
      }
    });
  }

  updateTaskView(newTask){
    let tasks = [...this.state.tasks];
    let taskObj = {};
    taskObj.id = newTask._id;
    taskObj.name = newTask.name;
    taskObj.description = newTask.description;
    taskObj.isTracking = newTask.isTracking;
    taskObj.duration = newTask.duration;
    tasks.push(taskObj);
    this.setState({
      tasks: tasks
    });
  }

  clearNewTask(){
    this.setState({
      newTask: {
        name: '',
        description: ''
      }
    });
  }

  deleteTask(taskId) {
    jQuery.ajax({
      type: "DELETE",
      url: 'http://localhost:1128/deleteTask/' + taskId,
      success: (data) => {
        this.getTasks();
      }
    });
  }

  getTasks(){
    jQuery.ajax({
      url: 'http://localhost:1128/tasks',
      success: (tasks) => {
        console.log(tasks);
        let taskList = tasks.map((task, index) => {
          let taskObj = {};
          taskObj.id = task._id;
          taskObj.name = task.name;
          taskObj.description = task.description;
          taskObj.isTracking = task.isTracking;
          taskObj.duration = task.duration;
          return taskObj;
        });
        this.setState({ tasks: taskList })
      }
    });
  }

  componentDidMount(){
    this.getTasks();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="tasks">
            <AddTask
              name={this.state.newTask.name}
              description={this.state.newTask.description}
              updateNewTask={this.updateNewTask.bind(this)}
              addTask={this.addTask.bind(this)}
            />
            <TaskListing tasks={this.state.tasks} toggleTaskStatus={this.toggleTaskStatus.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<RoboClock />, document.getElementById('app'));
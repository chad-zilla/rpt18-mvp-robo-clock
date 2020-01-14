const React = require('react');
const moment = require('moment');

import TimerButton from './TimerButton.jsx';
let TaskListing = (props) => {
  return <div className="tasks">
    { props.tasks.map( (task, index) => {
      if(task.duration !== undefined) {
        return <div className="task" key={index}>
        <div className="columns">
          <div className="column v-center-contents">
            {/* <div className="edit-icon"><i className="fas fa-edit"></i></div> */}
            <div><i onClick={ () => props.deleteTask(task.id)} className="fas fa-trash"></i></div>
          </div>
          <div className="column is-three-fifths">
            <div className="name">{task.name}</div>
            <div className="description">{task.description}</div>
          </div>
          <div className="column is-one-fifth v-center-contents">
            <div className={"minutes " + (task.duration.minutes <= 0) ? 'hide' : 'show'}>{task.duration.minutes} Minutes</div>
            <div className="seconds">{task.duration.seconds} Seconds</div>
          </div>
          <div className="column">
            <TimerButton
              isTracking={task.isTracking}
              toggleTaskStatus={props.toggleTaskStatus}
              id={task.id}
            />
          </div>
        </div>
      </div>
      }
    }) }
  </div>
}

export default TaskListing;
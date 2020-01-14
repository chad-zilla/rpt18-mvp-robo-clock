const React = require('react');

let TimerButton = (props) => {
  return <span className="timer-button" onClick={() => props.toggleTaskStatus(props.id, props.isTracking)}><i className={`fas ${(props.isTracking) ? 'fa-pause-circle': 'fa-play-circle'}`}></i></span>
};

export default TimerButton;

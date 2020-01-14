const React = require('react');

let AddTask = (props) => {
  return (<div>
            <fieldset>
              <legend>Add Task</legend>
              <div className="field">
              <div className="control">
                <label htmlFor="name" className="label is-small">Name</label>
                <input
                  className="input is-large"
                  type="text"
                  name="name"
                  value={props.name}
                  onChange={props.updateNewTask}
                />
              </div>
            </div>

            <label htmlFor="description" className="label is-small">Description</label>
            <div className="field">
              <div className="control"></div>
              <input
                className="input is-large"
                type="text"
                name="description"
                value={props.description}
                onChange={props.updateNewTask}
              />
            </div>
            <button onClick={props.addTask} className="button is-primary is-medium is-fullwidth">Add Task</button>

            </fieldset>
          </div>)
}

export default AddTask;
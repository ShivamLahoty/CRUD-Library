import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

function TodoItem({ task, deleteTaskCallback, moveTaskUpCallback, moveTaskDownCallback }) {
  return (
    <li aria-label="task">
      <span className="text">{task}</span>
      <button
        type="button"
        aria-label="Move task up"
        className="up-button"
        onClick={moveTaskUpCallback}
        title="Move up"
      >⬆️</button>
      <button
        type="button"
        aria-label="Move task down"
        className="down-button"
        onClick={moveTaskDownCallback}
        title="Move down"
      >⬇️</button>
      <button
        type="button"
        aria-label="Delete task"
        className="delete-button"
        onClick={deleteTaskCallback}
        title="Delete"
      >🗑️</button>
    </li>
  );
}

TodoItem.propTypes = {
  task: PropTypes.string.isRequired,
  deleteTaskCallback: PropTypes.func.isRequired,
  moveTaskUpCallback: PropTypes.func.isRequired,
  moveTaskDownCallback: PropTypes.func.isRequired,
};

export default TodoItem;

import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const updateTaskComplete = () => {
    console.log('updateTaskComplete is called');
    console.log('before the change', props.isComplete);
    props.updateComplete({ ...props, isComplete: !props.isComplete });
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={updateTaskComplete}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateComplete: PropTypes.func,
};

export default Task;
